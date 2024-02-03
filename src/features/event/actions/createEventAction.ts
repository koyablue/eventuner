"use server";

import { EventDate } from "@/stores/eventDateStore";
import { NewEventFormValidationError, validateNewEventFormReq } from "../validation/validators";
import { createNewEventService } from "../services/createNewEventService";
import type { AmPmString } from "@/types/models/event";
import type { Event } from "@/types/models/event";

type CreateEventActionResponse<T> = {
  data: T | undefined
  errors?: NewEventFormValidationError | undefined
  message?: string | null
};

type FormattedEventDate = {
  year: number
  month: number
  day: number
  timeRanges: {
    startAt: {
      hour?: number
      minutes?: number
      ampm?: AmPmString
    };
    endAt?: {
      hour?: number
      minutes?: number
      ampm?: AmPmString
    }
  }[]
}

/**
 *
 *
 * @param {EventDate[]} eventDates
 * @return {FormattedEventDate}
 */
const formatEventDates = (eventDates: EventDate[]): FormattedEventDate[] => {
  return eventDates.map(sd => {
    const [year, month, day] = sd.date.split("-").map(Number);

    const timeRanges = sd.timeRanges.map(tr => {
      const startAt = {
        hour: tr.startAt.hour,
        minutes: tr.startAt.minutes,
        ampm: tr.startAt.ampm,
      };
      const endAt = tr.endAt
        ? {
            hour: tr.endAt.hour,
            minutes: tr.endAt.minutes,
            ampm: tr.endAt.ampm,
          }
        : undefined;
      return { startAt, endAt }
    });

    return { year, month, day, timeRanges };
  });
};

/**
 * Server action for creating new event
 *
 * @param {EventDate[]} eventDates
 * @param {FormData} formData
 * @return {Promise<CreateEventActionResponse>}
 */
export const createEventAction = async (
  eventDates: EventDate[],
  formData: FormData
): Promise<CreateEventActionResponse<Event>> => {
  // Format request values
  const formattedEventDates = formatEventDates(eventDates);

  // Validation
  const validationRes = validateNewEventFormReq({
    name: formData.get("name"),
    description: formData.get("description"),
    eventDates: formattedEventDates,
  }, "Invalid or missing values");

  if (validationRes?.errors || !validationRes.data) {
    return {
      data: undefined,
      errors: validationRes.errors,
      message: validationRes.message,
    }
  }

  // Call the API to store Event and EventDates
  try {
    const res = await createNewEventService(validationRes.data);
    return { data: res }
  } catch (error) {
    console.error(error);
    return {
      data: undefined,
      errors: { server: "Failed to create event" },
      message: "Internal server error. Failed to create event",
    }
  }
};

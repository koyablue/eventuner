'use server';
import { ScheduleDate } from "@/stores/scheduleStore";
import { validateNewEventFormReq } from '../validation/validators';
import { getApiEndpointFull } from '@/routes/api';

export const createEvent = async (
  scheduleDates: ScheduleDate[],
  formData: FormData
) => {
  console.log(scheduleDates);

  const formattedScheduleDates = scheduleDates.map(sd => {
    const [year, month, day] = sd.date.split('-').map(Number);

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
      return { year, month, day, startAt, endAt }
    });

    return { year, month, day, timeRanges };
  });

  const validationRes = validateNewEventFormReq({
    name: formData.get('name'),
    description: formData.get('description'),
    scheduleDates: formattedScheduleDates,
  }, 'Invalid or missing values');

  if (validationRes?.errors) {
    return {
      errors: validationRes.errors,
      message: validationRes.message,
    }
  }

  try {
    await fetch(
      getApiEndpointFull('createEvent'),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validationRes.data),
        cache: "no-store",
      },
    );
  } catch (error) {
    console.error(error);
    return {
      errors: { server: 'Failed to create event' },
      message: "Internal server error. Failed to create event",
    }
  }
};

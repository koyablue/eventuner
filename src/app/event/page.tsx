"use client";

import { useState, useRef, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { DayModifiers } from "react-day-picker";
import { add, parseISO } from "date-fns";

import {
  EventCreated,
  EventForm,
  createEventAction,
  useEventFormError,
} from "@/features/event";

import { useDetectScrollToBottom } from "@/hooks/useDetectScrollToBottom";
import { useBeforeUnload } from "@/hooks/useBeforeUnload";

// stores
import { useEventDateStore, type TimeRange } from "@/stores/eventDateStore";

import { extract12HourFormat } from "@/utils";
import { cn } from "@/lib/utils";
import { showToast } from "@/lib/react-toastify";

/**
 * Event create page
 *
 * @return {JSX.Element}
 */
const NewEvent = () => {
  // Set beforeunload event handler
  useBeforeUnload();

  const { eventDates, addDate, removeDate, resetDates } = useEventDateStore();
  const [calendarSelectedDays, setCalendarSelectedDays] = useState<Date[] | undefined>();

  // true temporarily to implement EventCreated page
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [createdEventUuid, setCreatedEventUuid] = useState<string>("");

  // Indicates whether the proposed schedule section has been scrolled to the bottom
  const [isBottom, bottomRef] = useDetectScrollToBottom<HTMLDivElement>();

  // Refs for form
  const eventNameRef = useRef<HTMLInputElement>(null);
  const eventDescriptionRef = useRef<HTMLTextAreaElement>(null);

  // Handle form errors
  const {
    formErrors,
    setFormErrors,
    getFirstError,
    hasErrors,
    resetErrors,
    extractEventDatesErrors,
  } = useEventFormError();

  /**
   * Clear input values, selected days and time ranges
   *
   */
  const clearForm = () => {
    resetDates();
    if (eventNameRef.current) {
      eventNameRef.current.value = "";
    }
    if (eventDescriptionRef.current) {
      eventDescriptionRef.current.value = "";
    }
  };

  const createEvent = createEventAction.bind(null, eventDates);
  /**
   * Submit, validation, call API, state update
   *
   * @param {FormData} formData
   * @return {void}
   */
  const callCreateEventAction = useDebouncedCallback(async (formData: FormData) => {
    try {
      const res = await createEvent(formData);

      // Display errors if there are any errors
      const errors = res?.errors;
      if (errors) {
        if (!eventDates.length) {
          errors.eventDates = ["Please select dates"]
        }
        setFormErrors(errors);
        return;
      }
      if (!res.data) throw new Error("Response data is undefined");

      setCreatedEventUuid(res.data.uuid);
      clearForm();
      setIsSubmitted(true); // Display URL share component
    } catch (error) {
      console.error(error);
      showToast("error", <p>Failed to create event</p>)
    }
  }, 500);

  /**
   * Create time range object of current time ~ current time + 1hour
   *
   * @return {Omit<TimeRange, "id">}
   */
  const createCurrentTimeRange = (): Omit<TimeRange, "id">  => {
    const current = new Date();
    return {
      startAt: extract12HourFormat(current),
      endAt: extract12HourFormat(add(current, { hours: 1 })),
    };
  };

  /**
   * Action for when a date on Calendar is clicked
   *
   * @param {Date} clickedDate
   * @param {DayModifiers} { selected: wasSelected }
   */
  const onCalendarDayClicked = (clickedDate: Date, { selected: wasSelected }: DayModifiers) => {
    resetErrors("eventDates");

    wasSelected
      ? removeDate(clickedDate)
      : addDate({ date: clickedDate, timeRanges: [createCurrentTimeRange()] });
  };

  useEffect(() => {
    // Update calendar selection status based on the store
    const updatedSelectedDays = eventDates.map(eventDate => parseISO(eventDate.date));
    setCalendarSelectedDays(updatedSelectedDays);
  }, [eventDates]);

  return (
    <>
        {isSubmitted
          ? <EventCreated uuid={createdEventUuid} />
          : <EventForm
              selectedDays={calendarSelectedDays}
              eventDates={eventDates}
              errors={{
                name: getFirstError("name"),
                description: getFirstError("description"),
                eventDates: formErrors?.eventDates
              }}
              onCalendarDayClicked={onCalendarDayClicked}
              submitAction={callCreateEventAction}
            />
        }
    </>
  )
}

export default NewEvent;

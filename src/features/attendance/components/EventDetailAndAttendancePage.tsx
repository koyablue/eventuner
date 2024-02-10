"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { AttendanceFormContents } from "@/features/attendance/components/AttendanceFormContents";
import { createAttendancesAction } from "@/features/attendance/actions/createAttendancesAction";

import { Event } from "@/types/models/event";
import { NewAttendancesFormValidationError } from "@/features/attendance/validation/validators";
import { showToast } from "@/lib/react-toastify";
import { AttendanceRegistered } from "./AttendanceRegistered/AttendanceRegistered";
import { submitDebounceDuration } from "@/constants/form";

type Props = {
  event: Event
};

/**
 * Attendance form
 * Event detail
 *
 * @param {Props} { event }
 * @return {JSX.Element}
 */
export const EventDetailAndAttendancePage = ({ event }: Props) => {
  const [formErrors, setFormErrors] = useState<NewAttendancesFormValidationError>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const createAttendances = createAttendancesAction.bind(null, { eventId: event.id, uuid: event.uuid});

  /**
   *
   *
   * @param {FormData} formData
   * @return {Promise<void>}
   */
  const callCreateAttendanceAction = useDebouncedCallback(async (formData: FormData) => {
    const res = await createAttendances(formData);

    const showErrorToast = (msg: string) => {
      showToast("error", <p>{msg}</p>);
    }

    if (res?.errors) {
      setFormErrors(res.errors);
      // Show toast because form section is scrollable
      // and the user might not notice error messages in the form
      showErrorToast("Failed to register attendance. Please correct form errors")
      return;
    }

    setIsSubmitted(true);
  }, submitDebounceDuration);

  const reload = () => {
    setIsSubmitted(false);
  };

  return (
    <>
      {isSubmitted
        ? <AttendanceRegistered reloadAction={reload} />
        : (
          <div className="relative md:h-full md:flex md:overflow-hidden">

          <div className="md:overflow-auto md:w-1/3 md:border-r md:h-full lg:w-1/2">
            <header className="pt-16 pb-8">
              <h1 className="text-3xl font-semibold truncate md:text-lg lg:text-2xl">
                {event.name}
              </h1>
            </header>
            <div className="text-muted-foreground md:pr-8">
              <p>{event.description || "No description for this event."}</p>
            </div>
          </div>

          <div className="overflow-auto flex-1 md:w-1/2 md:pl-4 lg:pl-8 md:h-full">
            <form action={callCreateAttendanceAction} autoComplete="off" className="h-full">
              <AttendanceFormContents event={event} errors={formErrors} />
            </form>
          </div>
        </div>
        )
      }
    </>
  );
};

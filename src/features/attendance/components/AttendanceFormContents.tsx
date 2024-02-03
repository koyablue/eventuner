"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icnos";
import { DateAttendanceSection } from "@/features/attendance/components/DateAttendanceSection";
import { Event } from "@/types/models/event";
import { FormError } from "@/components/form/FormError";
import { NewAttendancesFormValidationError } from "@/features/attendance/validation/validators";

type Props = {
  event: Event
  errors?: NewAttendancesFormValidationError
}

export const AttendanceFormContents = ({ event, errors }: Props) => {
  const { pending } = useFormStatus();

  return (
    <>
      <div className="py-8">
        <Label>Your name</Label>
        <Input name="attendeeName" className="focus-visible:border-emerald-500 focus-visible:ring-0 focus-visible:ring-offset-0" />
        <FormError message={errors?.attendeeName && errors.attendeeName.length ? errors.attendeeName[0] : ""} />
      </div>
      {event.eventDates.map(eventDate =>
        <DateAttendanceSection key={eventDate.id} eventDate={eventDate} />
      )}
      <div className="fixed bottom-10 right-6 z-50 md:absolute md:mb-4 md:mr-4 md:bottom-0 md:right-0">
        <Button
          type="submit"
          className="w-48 px-2 bg-emerald-500 text-white hover:bg-emerald-600"
        >
          <div className="w-full flex items-center gap-1">
            <div className={`${pending ? '' : 'invisible'}`}>
              <Icons.loaderC size={16} className="animate-spin" />
            </div>
            <p>Register Attendance</p>
          </div>
        </Button>
      </div>
    </>
  );
};

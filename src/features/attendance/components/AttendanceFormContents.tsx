"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { DateAttendanceSection } from "./DateAttendanceSection";
import { Event } from "@/types/models/event";

type Props = {
  event: Event
}

export const AttendanceFormContents = ({ event }: Props) => {
  return (
    <>
      <div className="py-8">
        <Label>Your name</Label>
        <Input name="attendeeName" className="focus-visible:border-emerald-500 focus-visible:ring-0 focus-visible:ring-offset-0" />
      </div>
      {event.eventDates.map(eventDate =>
        <DateAttendanceSection key={eventDate.id} eventDate={eventDate} />
      )}
      <div className="fixed bottom-10 right-6 z-50 md:absolute md:mb-4 md:mr-4 md:bottom-0 md:right-0">
        <Button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 shadow-lg"
        >
          Register Attendance
        </Button>
      </div>
    </>
  );
};

"use client";

import { formatISO } from "date-fns";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { DateAttendanceSection } from "@/features/attendance/components/DateAttendanceSection";
import { createAttendancesAction } from "../actions/createAttendancesAction";

import { Event } from "@/types/models/event";
import { useDateUtil } from "@/hooks/useDateUtil";

type Props = {
  event: Event
};

export const AttendancePage = ({ event }: Props) => {
  const { utcToOrdinalDate } = useDateUtil();

  // event looks like this:
    // {
    //   "id": 18,
    //   "uuid": "3bc6242b-6018-4d6c-aae0-0c30f4cf923e",
    //   "token": "81293b43-7c64-463f-8002-35600202aca6",
    //   "name": "test event",
    //   "description": "test event description",
    //   "eventDates": [
    //       {
    //           "id": 35,
    //           "eventId": 18,
    //           "date": "2024-01-30T08:00:00.000Z",
    //           "timeRanges": [
    //               {
    //                   "id": 1,
    //                   "eventDateId": 35,
    //                   "startAt": "2024-01-31T03:10:00.000Z",
    //                   "endAt": "2024-01-31T04:10:00.000Z",
    //                   "createdAt": "2024-01-31T03:14:44.592Z",
    //                   "updatedAt": "2024-01-31T03:14:44.592Z"
    //               }
    //           ],
    //           "createdAt": "2024-01-31T03:14:44.592Z",
    //           "updatedAt": "2024-01-31T03:14:44.592Z",
    //           "attendances": []
    //       },
    //       {
    //           "id": 36,
    //           "eventId": 18,
    //           "date": "2024-02-01T08:00:00.000Z",
    //           "timeRanges": [
    //               {
    //                   "id": 2,
    //                   "eventDateId": 36,
    //                   "startAt": "2024-02-02T07:00:00.000Z",
    //                   "endAt": "2024-02-01T08:20:00.000Z",
    //                   "createdAt": "2024-01-31T03:14:44.592Z",
    //                   "updatedAt": "2024-01-31T03:14:44.592Z"
    //               }
    //           ],
    //           "createdAt": "2024-01-31T03:14:44.592Z",
    //           "updatedAt": "2024-01-31T03:14:44.592Z",
    //           "attendances": []
    //       }
    //   ],
    //   "attendances": [],
    //   "createdAt": "2024-01-31T03:14:44.592Z",
    //   "updatedAt": "2024-01-31T03:14:44.592Z"
    // }

  // and item of attendances array should be like this:
  // {
  //   "id": 1,
  //   "eventId": 10,
  //   "eventDateId": 20,
  //   "attendeeName": "attendee name",
  //   "anonymousAttendeeId": "匿名ID",
  //   "status": 0,
  //   "createdAt": "2022-01-01T00:00:00.000Z",
  //   "updatedAt": "2022-01-01T00:00:00.000Z"
  // }

  const tmpTimeRangesAndAttendees = [
    {
      timeRange: "09:30 am - 11:30 am",
      attendees: [
        { name: "Alexander McQueen", status: 1 },
        { name: "John Smith", status: 1 },
        { name: "Tyler Durden", status: 1 },
        { name: "Craig Owens", status: 1 },
        { name: "Cory Taylor", status: 1 },
        { name: "Soshina", status: 2 },
        { name: "Ano-chan", status: 3 },
        { name: "Seiya", status: 1 },
      ]
    },
    {
      timeRange: "09:30 am - 11:30 am",
      attendees: [
        { name: "Alexander McQueen", status: 1 },
        { name: "John Smith", status: 1 },
        { name: "Tyler Durden", status: 1 },
        { name: "Craig Owens", status: 1 },
        { name: "Cory Taylor", status: 1 },
        { name: "Soshina", status: 2 },
        { name: "Ano-chan", status: 3 },
        { name: "Seiya", status: 1 },
      ]
    },
  ];

  return (
    <div className="relative md:h-full md:overflow-auto md:flex">

      <div className="md:w-1/3 md:border-r md:h-full lg:w-1/2">
        <header className="pt-16 pb-8">
          <h1 className="text-3xl font-semibold truncate md:text-lg lg:text-2xl">
            {event.name}
          </h1>
        </header>
        <div className="text-muted-foreground md:pr-8">
          <p>{event.description}</p>
        </div>
      </div>

      <div className="overflow-auto flex-1 md:w-1/2 md:pl-4 lg:pl-8 md:h-full">
        <form action={createAttendancesAction} className="h-full">
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
        </form>
      </div>
    </div>
  );
};

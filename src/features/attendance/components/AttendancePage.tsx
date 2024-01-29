"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DateAttendanceSection } from "@/features/attendance";

export const AttendancePage = () => {
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
          <h1 className="text-3xl font-semibold truncate md:text-lg lg:text-2xl">Random event name here</h1>
        </header>
        {/* TODO: description */}
        <div className="text-muted-foreground md:pr-8">
          <p>Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>

      <div className="overflow-auto flex-1 md:w-1/2 md:pl-4 lg:pl-8 md:h-full">
        <form className="h-full">
          <div className="py-8">
            <Label>Your name</Label>
            <Input className="focus-visible:border-emerald-500 focus-visible:ring-0 focus-visible:ring-offset-0" />
          </div>
          <DateAttendanceSection
            date='Fri, 1st, Apr, 2024'
            timeRangesAttendees={tmpTimeRangesAndAttendees}
          />
          <DateAttendanceSection
            date='Fri, 1st, Apr, 2024'
            timeRangesAttendees={tmpTimeRangesAndAttendees}
          />
          <DateAttendanceSection
            date='Fri, 1st, Apr, 2024'
            timeRangesAttendees={tmpTimeRangesAndAttendees}
          />
          <DateAttendanceSection
            date='Fri, 1st, Apr, 2024'
            timeRangesAttendees={tmpTimeRangesAndAttendees}
          />
          <DateAttendanceSection
            date='Fri, 1st, Apr, 2024'
            timeRangesAttendees={tmpTimeRangesAndAttendees}
          />
          <DateAttendanceSection
            date='Fri, 1st, Apr, 2024'
            timeRangesAttendees={tmpTimeRangesAndAttendees}
          />
          <DateAttendanceSection
            date='Fri, 1st, Apr, 2024'
            timeRangesAttendees={tmpTimeRangesAndAttendees}
          />

          <div className="fixed bottom-10 right-6 z-50 md:absolute md:mb-4 md:mr-4 md:bottom-0 md:right-0">
            <Button
              className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 shadow-lg"
            >
              Register Attendance
            </Button>
          </div>
        </form>
      </div>

      {/* <Button
        className="fixed bottom-10 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 shadow-lg"
      >
        Register Attendance
      </Button> */}
    </div>
  );
};

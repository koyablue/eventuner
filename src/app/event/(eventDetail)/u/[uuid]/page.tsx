import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DateAttendanceSection } from "@/features/attendance";

const EventDetail = () => {
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
    <div className="relative min-h-screen md:max-h-full md:overflow-auto">
      <header className="pt-16 pb-8">
        <h1 className="text-3xl font-semibold truncate">Random event name here</h1>
      </header>
      <div className="overflow-auto">
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
        </form>
      </div>

      <Button
        className="fixed bottom-10 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 shadow-lg"
      >
        Register Attendance
      </Button>
    </div>
  );
};

export default EventDetail;

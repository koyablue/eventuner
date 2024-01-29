import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { type AttendanceStatusType, attendanceStatus } from "@/constants/attendance";
import { AttendeeBadge } from "@/features/attendance/component/AttendeeBadge";

type Props = {
  timeRange: string
  attendees: {
    name: string
    status: number
  }[]
};

/**
 *
 *
 * @param {Props} { timeRange, attendees }
 * @return {JSX.Element}
 */
export const TimeRangeAttendanceSection = ({ timeRange, attendees }: Props) => {
  const getAttendanceSummary = () => {
    let yes = 0;
    let maybe = 0;
    let declined = 0;
    for (let i = 0; i < attendees.length; i++) {
      if (attendees[i].status === attendanceStatus.attending) {
        yes++;
        continue;
      }

      if (attendees[i].status === attendanceStatus.notSure) {
        maybe++;
        continue;
      }

      if (attendees[i].status === attendanceStatus.notAttending) {
        declined++;
        continue;
      }
    }

    return `${yes} yes, ${maybe} maybe, ${declined} declined`;
  };

  return (
    <div className="w-full flex flex-col gap-4 mb-8">
      <div>
        <p className="font-semibold">
          {timeRange}
        </p>
      </div>

      <div>
        <RadioGroup defaultValue={String(attendanceStatus.notAttending)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={String(attendanceStatus.attending)} id="radio-attending" />
            <Label htmlFor="radio-attending" className="cursor-pointer">Attending</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={String(attendanceStatus.notSure)} id="radio-maybe" />
            <Label htmlFor="radio-maybe" className="cursor-pointer">Maybe</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={String(attendanceStatus.notAttending)} id="radio-not-attending" />
            <Label htmlFor="radio-not-attending" className="cursor-pointer">Not attending</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <p className="text-muted-foreground">
          {getAttendanceSummary()}
        </p>
      </div>

      <div className="w-full flex flex-wrap gap-2">
        {attendees.map(attendee =>
          <AttendeeBadge
            key={`${attendee.name}${attendee.status}`}
            label={attendee.name}
            status={attendee.status as AttendanceStatusType}
          />
        )}
      </div>
    </div>
  );
};

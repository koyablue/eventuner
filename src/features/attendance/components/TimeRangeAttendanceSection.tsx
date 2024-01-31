import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { attendanceStatus } from "@/constants/attendance";
import { AttendanceStatus } from "@/types/models/event";
import { AttendeeBadge } from "@/features/attendance/components/AttendeeBadge";
import { Attendance } from "@/types/models/event";

type Props = {
  radioGroupName : string
  timeRangeStr: string
  attendances?: Attendance[]
};

/**
 *
 *
 * @param {Props} { timeRange, attendances }
 * @return {JSX.Element}
 */
export const TimeRangeAttendanceSection = ({ radioGroupName, timeRangeStr, attendances = [] }: Props) => {

  /**
   * Get detailed breakdown of attendance
   *
   * @return {string}
   */
  const getAttendanceDetail = (): string => {
    let yes = 0;
    let maybe = 0;
    let declined = 0;

    const detailStr = () => {
      if (yes === 0 && maybe === 0 && declined === 0) {
        return "No one has answered yet.";
      }
      return `${yes} yes, ${maybe} maybe, ${declined} declined`
    };

    if (!attendances.length) return detailStr();

    for (let i = 0; i < attendances.length; i++) {
      if (attendances[i].status === attendanceStatus.attending) {
        yes++;
        continue;
      }
      if (attendances[i].status === attendanceStatus.notSure) {
        maybe++;
        continue;
      }
      if (attendances[i].status === attendanceStatus.notAttending) {
        declined++;
        continue;
      }
    }
    return detailStr();
  };

  return (
    <div className="w-full flex flex-col gap-4 mb-8">
      <div>
        <p className="font-semibold">{timeRangeStr}</p>
      </div>

      <div>
        <RadioGroup name={radioGroupName} defaultValue={String(attendanceStatus.notAttending)}>
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
          {getAttendanceDetail()}
        </p>
      </div>

      <div className="w-full flex flex-wrap gap-2">
        {
          attendances.length
            ? attendances.map(attendance =>
                <AttendeeBadge
                  key={attendance.id}
                  label={attendance.attendeeName}
                  status={attendance.status as AttendanceStatus}
                />
              )
            : <></>
        }
      </div>
    </div>
  );
};

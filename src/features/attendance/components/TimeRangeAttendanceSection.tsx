import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormError } from "@/components/form/FormError";
import { AttendeeBadge } from "@/features/attendance/components/AttendeeBadge";
import { NewAttendancesFormValidationError } from "@/features/attendance/validation/validators";
import { attendanceStatus } from "@/constants/attendance";
import { AttendanceStatus, Attendance } from "@/types/models/event";

type Props = {
  timeRangeId: number
  timeRangeStr: string
  attendances?: Attendance[]
  errors?: NewAttendancesFormValidationError["attendances"]
};

/**
 *
 *
 * @param {Props} { timeRangeId, timeRangeStr, attendances }
 * @return {JSX.Element}
 */
export const TimeRangeAttendanceSection = ({ timeRangeId, timeRangeStr, attendances = [], errors }: Props) => {

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
      const status = attendances[i].status;
      if (status === attendanceStatus.attending) {
        yes++;
      } else if (status === attendanceStatus.notSure) {
        maybe++;
      } else if (status === attendanceStatus.notAttending) {
        declined++;
      }
    }
    return detailStr();
  };

  const radioGroupName = `attendances-${timeRangeId}`;

  /**
   *
   *
   * @return {string} error message
   */
  const getFirstErrorMessage = (): string => {
    if (errors && errors.length && errors[0].timeRangeId === timeRangeId && errors[0].messages.length) {
      return errors[0].messages[0];
    }
    return "";
  };

  return (
    <div className="w-full flex flex-col gap-4 mb-8">
      <div>
        <p className="font-semibold">{timeRangeStr}</p>
      </div>

      <div>
        <RadioGroup name={`attendances-${timeRangeId}`} defaultValue={String(attendanceStatus.notAttending)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={String(attendanceStatus.attending)} id={`radio-attending-${radioGroupName}`} />
            <Label htmlFor={`radio-attending-${radioGroupName}`} className="cursor-pointer">Attending</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={String(attendanceStatus.notSure)} id={`radio-maybe-${radioGroupName}`} />
            <Label htmlFor={`radio-maybe-${radioGroupName}`} className="cursor-pointer">Maybe</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={String(attendanceStatus.notAttending)} id={`radio-not-attending-${radioGroupName}`} />
            <Label htmlFor={`radio-not-attending-${radioGroupName}`} className="cursor-pointer">Not attending</Label>
          </div>
        </RadioGroup>
        <FormError message={getFirstErrorMessage()} />
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

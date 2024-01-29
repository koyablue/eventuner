import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icnos";
import { type AttendanceStatusType, attendanceStatus } from "@/constants/attendance";

type Props = {
  status: AttendanceStatusType
  label: string
}

/**
 * Badge with name of an attendee and a corresponding icon of attendance type
 *
 * @param {Props} { status, label }
 * @return {JSX.Element}
 */
export const AttendeeBadge = ({ status, label }: Props) => {
  const iconProps = {
    [attendanceStatus.attending]: { component: Icons.checkCircle, color: "text-emerald-500" },
    [attendanceStatus.notAttending]: { component: Icons.xCircle, color: "text-red-400" },
    [attendanceStatus.notSure]: { component: Icons.checkCircle, color: "text-orange-300" },
  };

  const IconComponent = iconProps[status].component;
  const iconColor = iconProps[status].color;

  return (
    <Badge variant="outline" className="max-w-44 px-1.5 py-1 flex justify-start gap-1 truncate">
      <div className="flex-shrink-0 w-6 h-6">
        <IconComponent className={`w-full h-full ${iconColor}`} />
      </div>
      <p className="truncate">{label}</p>
    </Badge>
  );
};

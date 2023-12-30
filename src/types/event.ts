import { ValueOf } from "./util";
import { attendanceStatus } from "@/constants/attendance";

export type AmPmString = "am" | "pm";

export type AttendanceStatus = ValueOf<typeof attendanceStatus>;

// type guard for AttendanceStatus
export function isAttendanceStatus(value: number): value is AttendanceStatus {
  const validAttendanceStatuses: AttendanceStatus[] = Object.values(attendanceStatus);
  return validAttendanceStatuses.includes(value as AttendanceStatus);
}

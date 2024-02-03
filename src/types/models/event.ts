import { ValueOf } from "../util";
import { attendanceStatus } from "@/constants/attendance";

export type AmPmString = "am" | "pm";

export type AttendanceStatus = ValueOf<typeof attendanceStatus>;

// type guard for AttendanceStatus
export function isAttendanceStatus(value: number): value is AttendanceStatus {
  const validAttendanceStatuses: AttendanceStatus[] = Object.values(attendanceStatus);
  return validAttendanceStatuses.includes(value as AttendanceStatus);
}

export type Attendance = {
  id: number
  timeRangeId: number
  attendeeName: string
  anonymousAttendeeId: string
  status: AttendanceStatus
  createdAt: Date
  updatedAt: Date
};

export type TimeRange = {
  id: number
  startAt: Date
  endAt?: Date | null
  attendances?: Attendance[]
};

export type EventDate = {
  id: number
  eventId: number
  date: Date
  timeRanges: TimeRange[]
  createdAt: Date
  updatedAt: Date
};

export type Event = {
  id: number;
  uuid: string;
  token: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  eventDates: EventDate[]
};

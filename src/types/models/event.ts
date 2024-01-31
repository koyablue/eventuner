import { AttendanceStatus } from "../event";

export type Attendance = {
  id: number
  eventId: number
  eventDateId: number
  attendeeName: string
  anonymousAttendeeId: string
  status: AttendanceStatus
  createdAt: Date
  updatedAt: Date
};

export type TimeRange = {
  startAt: Date
  endAt?: Date | null
};

export type EventDate = {
  id: number
  eventId: number
  date: Date
  timeRanges: TimeRange[]
  createdAt: Date
  updatedAt: Date
  attendances?: Attendance[]
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
  attendances: Attendance[]
};

import { AttendanceStatus } from "@/types/models/event";

type Attendances = {
  eventDateId: number
  status: AttendanceStatus
};

export type CreateAttendancesDto = {
  eventUuid: string
  attendeeName: string
  anonymousAttendeeId: string
  attendances: Attendances[]
};

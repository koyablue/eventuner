import { AttendanceStatus } from "@/types/event";

type Attendances = {
  eventDateId: number
  status: AttendanceStatus
};

export type CreateAttendancesDto = {
  eventUuid: string
  participantName: string
  anonymousParticipantId: string
  attendances: Attendances[]
};

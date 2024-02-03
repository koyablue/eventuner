import { AttendanceStatus } from "@/types/models/event";

export type AttendancePerTimeRangeDto = {
  timeRangeId: number
  attendanceStatus: AttendanceStatus
};

export type CreateAttendancesUseCaseDto = {
  attendeeName: string
  anonymousAttendeeId: string
  attendances: AttendancePerTimeRangeDto[]
};

export type CreateAttendanceRepoDto = {
  attendeeName: string
  anonymousAttendeeId: string
  timeRangeId: number
  attendanceStatus: AttendanceStatus
};

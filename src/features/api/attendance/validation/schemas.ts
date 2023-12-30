import { z } from "zod";
import { attendanceStatus } from "@/constants/attendance";

export const AttendanceStatusSchema = z.union([
  z.literal(attendanceStatus.attending),
  z.literal(attendanceStatus.notAttending),
  z.literal(attendanceStatus.notSure)
]);

export const EventDateAndStatusMapSchema = z.object({
  eventDateId: z.coerce.number(),
  status: AttendanceStatusSchema
});

export const AttendancesSchema = z.object({
  participantName: z.string().min(1).max(50),
  attendances: z.array(EventDateAndStatusMapSchema).nonempty()
});

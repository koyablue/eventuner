import { z } from "zod";
import { isAttendanceStatus } from "@/types/models/event";

const AttendanceStatusSchema = z
  .number()
  .refine(status => isAttendanceStatus(status), {
    message: "Invalid attendance status",
  });

const TimeRangeAttendanceStatusSchema = z.object({
  timeRangeId: z.number(),
  attendanceStatus: AttendanceStatusSchema,
});

export const AttendancesSchema = z.object({
  attendeeName: z.string().min(1).max(100),
  attendances: z.array(TimeRangeAttendanceStatusSchema).nonempty()
});

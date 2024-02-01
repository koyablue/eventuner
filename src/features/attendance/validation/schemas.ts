import { z } from "zod";
import { isAttendanceStatus } from "@/types/models/event";

const AttendanceStatusSchema = z.number().refine(v => isAttendanceStatus(v), {
  message: "Invalid attendance status",
});

const AttendanceSchema = z.record(AttendanceStatusSchema);

// Validation for attendance form
export const CreateAttendancesSchema = z.object({
  attendeeName: z
    .string({
      required_error: "Please enter your name",
      invalid_type_error: "Invalid attendee name",
    })
    .min(1, { message: "Please enter your name" })
    .max(100, { message: "Attendee name must be less than 100 characters" }),
  attendances: AttendanceSchema,
});

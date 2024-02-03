import { z } from "zod";
import { CreateAttendancesSchema } from "./schemas";

export type NewAttendancesFormValidatedData = z.infer<typeof CreateAttendancesSchema>;

export type NewAttendancesFormValidationError = {
  attendeeName?: string[]
  attendances?: { timeRangeId: number; messages: string[] }[]
  server?: string
};

export type ValidateNewAttendancesFormReturnType = {
  data: NewAttendancesFormValidatedData | null
  errors?: NewAttendancesFormValidationError
  message: string
};

/**
 * Validator for attendance registration form
 *
 * @param {*} reqBody
 * @param {string} [message=""]
 * @return {ValidateNewAttendancesFormReturnType}
 */
export const validateNewAttendancesReq = (reqBody: any, message = ""): ValidateNewAttendancesFormReturnType => {
  const validatedFields = CreateAttendancesSchema.safeParse(reqBody);

  if (!validatedFields.success) {
    const errors: NewAttendancesFormValidationError = {};

    for (const issue of validatedFields.error.issues) {
      if (issue.path[0] === "attendeeName") {
        errors.attendeeName = errors.attendeeName || [];
        errors.attendeeName.push(issue.message);
      } else if (issue.path[0] === "attendances") {
        const timeRangeId = Number(issue.path[1]);
        if (isNaN(timeRangeId)) continue;

        errors.attendances = errors.attendances || [];
        const existingErrorIndex = errors.attendances.findIndex(e => e.timeRangeId === timeRangeId);

        existingErrorIndex !== -1
          // if an error for this timeRangeId already exists, add the new message
          ? errors.attendances[existingErrorIndex].messages.push(issue.message)
          // if no error for this timeRangeId, add a new error object
          : errors.attendances.push({ timeRangeId, messages: [issue.message] });
      }
    }

    return { data: null, errors, message };
  }

  return { data: validatedFields.data, message };
};

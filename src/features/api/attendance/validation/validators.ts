import { z } from "zod";
import { AttendancesSchema } from "./schemas";

export type ValidateNewAttendancesReturnType = z.infer<typeof AttendancesSchema>

/**
 *
 *
 * @param {*} reqBody
 * @return {z.SafeParseReturnType<any, ValidateNewAttendancesReturnType>}
 */
export const validateNewAttendances = (reqBody: any): z.SafeParseReturnType<any, ValidateNewAttendancesReturnType> => AttendancesSchema.safeParse(reqBody)

type AttendanceValidationError = {
  eventDateId?: string[];
  status?: string[];
};

export type AttendancesValidationErrors = {
  attendances?: AttendanceValidationError[];
};

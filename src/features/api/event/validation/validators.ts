import { z } from "zod";
import { NewEventSchema } from "@/features/api/event/validation/schemas";

export const validateDate = (year: number, month: number, day: number): boolean => {
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};

export type ValidateNewEventReturnType = z.infer<typeof NewEventSchema>

/**
 * Validation for creating new event
 *
 * @param {*} reqBody
 * @return {z.SafeParseReturnType<any, ValidateNewEventReturnType>}
 */
export const validateNewEventReq = (reqBody: any): z.SafeParseReturnType<any, ValidateNewEventReturnType> => NewEventSchema.safeParse(reqBody);


export type NewEventValidationErrors = {
  name?: string[];
  description?: string[];
  eventDates?: string[];
}

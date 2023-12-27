import { z } from "zod";
import { NewEventSchema } from "../schemas/event";

export type ValidateNewEventReturnType = z.infer<typeof NewEventSchema>

/**
 * Validation for creating new event
 *
 * @param {*} reqBody
 * @return {z.SafeParseReturnType<any, ValidateNewEventReturnType>}
 */
export const validateNewEventReq = (reqBody: any): z.SafeParseReturnType<any, ValidateNewEventReturnType> => NewEventSchema.safeParse(reqBody);


export type NewEventValidationErrors = {
  name?: string[] | undefined;
  description?: string[] | undefined;
  eventDates?: string[] | undefined;
}

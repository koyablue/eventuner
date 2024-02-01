import { z } from "zod";
import { NewEventFormSchema } from "./schemas";

export type NewEventFormValidatedData = z.infer<typeof NewEventFormSchema>;

export type NewEventFormValidationError = {
  name?: string[]
  description?: string[]
  eventDates?: string[]
  server?: string
};

export type ValidateNewEventFormReturnType = {
  data: NewEventFormValidatedData | null
  errors?: NewEventFormValidationError
  message: string
};

/**
 * Validator for event create form
 *
 * @param {*} reqBody
 * @param {string} [message='']
 * @return {ValidateNewEventFormReturnType}
 */
export const validateNewEventFormReq = (reqBody: any, message = ""): ValidateNewEventFormReturnType => {
  console.log(JSON.stringify(reqBody, null, 2));
  const validatedFields = NewEventFormSchema.safeParse(reqBody);
  console.log('validatedFields:', validatedFields);

  if (!validatedFields.success) {
    console.log('validation error:',validatedFields.error.flatten())
    return {
      data: null,
      errors: validatedFields.error.flatten().fieldErrors,
      message,
    };
  }

  return {
    data: validatedFields.data,
    message,
  }
}

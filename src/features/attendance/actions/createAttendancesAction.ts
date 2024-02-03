"use server";

import { NewAttendancesFormValidationError, validateNewAttendancesReq } from "@/features/attendance/validation/validators";
import { createNewAttendancesService, type CreateNewAttendancesServiceDto } from "@/features/attendance/services/createNewAttendancesService";

type CreateAttendanceActionResponse<T> = {
  data: T | undefined
  errors?: NewAttendancesFormValidationError | undefined
  message?: string | null
};

/**
 * Server action for creating multiple attendances
 *
 * @param {{ eventId: number; uuid: string; }} { eventId, uuid }
 * @param {FormData} formData
 * @return {Promise<CreateAttendanceActionResponse<number>>}
 */
export const createAttendancesAction = async ({ eventId, uuid }: { eventId: number; uuid: string; }, formData: FormData): Promise<CreateAttendanceActionResponse<number> | undefined> => {
  // formData key value pair looks like this:
  // attendeeName aaaaaaaa
  // attendances-3 1
  // attendances-4 3
  // attendances-5 2

  const attendances: { [key: number]: number }= {};

  for (const [k, v] of formData.entries()) {
    if (k.startsWith("attendances-")) {
      const timeRangeId = Number(k.split("-")[1]);

      if (isNaN(timeRangeId)) {
        throw new Error("Invalid field was given");
      }
      attendances[timeRangeId] = Number(v);
      continue;
    }
  }

  // structure looks like this:
  // {
  //   attendeeName: "Attendee Name",
  //   attendances: { '3': 2, '4': 2, '5': 2 }
  // }
  const req = { attendeeName: formData.get("attendeeName"), attendances };

  const validatedFields = validateNewAttendancesReq(req);
  if (validatedFields.errors || !validatedFields.data) {
    return {
      data: undefined,
      errors: validatedFields.errors,
      message: validatedFields.message,
    }
  }

  try {
    const attendances: CreateNewAttendancesServiceDto["attendances"] = [];
    for (const[k, v] of Object.entries(validatedFields.data.attendances)) {
      attendances.push({ timeRangeId: Number(k), attendanceStatus: v })
    }

    const dto: CreateNewAttendancesServiceDto = {
      attendeeName: validatedFields.data.attendeeName,
      attendances,
    };

    const res = await createNewAttendancesService(eventId, dto);

    return { data: res };
  } catch (error) {
    console.error(error);
    return {
      data: undefined,
      errors: { server: "Failed to register attendance" },
      message: "Internal server error. Failed to register attendance",
    };
  }
};

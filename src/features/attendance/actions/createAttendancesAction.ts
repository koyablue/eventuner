"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  NewAttendancesFormValidationError,
  validateNewAttendancesReq,
} from "@/features/attendance/validation/validators";
import {
  createNewAttendancesService,
  type CreateNewAttendancesServiceDto,
} from "@/features/attendance/services/createNewAttendancesService";
import { getWebRoute } from "@/lib/routes/web";

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
  // Format attendance
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

  // Validation
  // The structure of obj looks like this:
  // {
  //   attendeeName: "Attendee Name",
  //   attendances: { '3': 2, '4': 2, '5': 2 }
  // }
  const validatedFields = validateNewAttendancesReq({
    attendeeName: formData.get("attendeeName"),
    attendances,
  });
  if (validatedFields.errors || !validatedFields.data) {
    return {
      data: undefined,
      errors: validatedFields.errors,
      message: validatedFields.message,
    }
  }

  try {
    // Make pair of timeRangeId and attendanceStatus
    const attendances: CreateNewAttendancesServiceDto["attendances"] = [];
    for (const[k, v] of Object.entries(validatedFields.data.attendances)) {
      attendances.push({ timeRangeId: Number(k), attendanceStatus: v })
    }

    const dto: CreateNewAttendancesServiceDto = {
      attendeeName: validatedFields.data.attendeeName,
      attendances,
    };

    await createNewAttendancesService(eventId, dto);
  } catch (error) {
    console.error(error);
    return {
      data: undefined,
      errors: { server: "Failed to register attendance" },
      message: "Internal server error. Failed to register attendance",
    };
  }

  const eventDetailPagePath = getWebRoute("eventDetail", { uuid });
  revalidatePath(eventDetailPagePath);
  redirect(eventDetailPagePath);
};

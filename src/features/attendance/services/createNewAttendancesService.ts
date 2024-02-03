import { NewAttendancesFormValidatedData } from "@/features/attendance/validation/validators";
import { getApiEndpointFull } from "@/lib/routes/api";

export type CreateNewAttendancesServiceDto = {
  attendeeName: string
  attendances: { timeRangeId: number; attendanceStatus: number; }[]
};

/**
 * Call create attendances API
 *
 * @param {number} eventId
 * @param {NewAttendancesFormValidatedData} values
 * @return {Promise<number>} number of created record
 */
export const createNewAttendancesService = async (eventId: number, values: CreateNewAttendancesServiceDto): Promise<number> => {
  try {
    const res = await fetch(
      getApiEndpointFull("createAttendances", { eventId }),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to create attendances");

    return (await res.json()).data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

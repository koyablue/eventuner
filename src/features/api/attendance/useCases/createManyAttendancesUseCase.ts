import { v4 as uuidv4 } from "uuid";
import { CreateAttendancesDto } from "@/features/api/attendance/types";
import { getEventByUuid } from "@/features/api/event/repositories/eventRepository";
import { createManyAttendances } from "@/features/api/attendance/repositories/attendanceRepository";
import { Attendance } from "@/types/models/event";

/**
 * Create multiple attendance records
 *
 * @param {Omit<CreateAttendancesDto, "anonymousAttendeeId">} values
 * @return {Promise<Attendance[]>}
 */
export const createManyAttendancesUseCase = async (values: Omit<CreateAttendancesDto, "anonymousAttendeeId">): Promise<Attendance[]> => {
  try {
    const event = await getEventByUuid(values.eventUuid);
    if (values.attendances.length !==  event.eventDates.length) {
      throw new Error("The number of Attendance does not match the number of EventDate");
    }

    await createManyAttendances(event, { anonymousAttendeeId: uuidv4(), ...values});
    const createdAttendances = (await getEventByUuid(values.eventUuid)).attendances;

    return createdAttendances.map(attendance => ({
      id: attendance.id,
      eventId: attendance.eventId,
      eventDateId: attendance.eventDateId,
      attendeeName: attendance.attendeeName,
      anonymousAttendeeId: attendance.anonymousAttendeeId,
      status: attendance.status,
      createdAt: attendance.createdAt,
      updatedAt: attendance.updatedAt,
    }));

  } catch (error) {
    console.error(error);
    throw new InternalServerError("Failed to register attendances", error);
  }
};

import { prisma } from "@/libs/prisma";
import { Attendance as PrismaAttendance } from "@prisma/client";
import { Event } from "@/types/models/event";
import { CreateAttendancesDto } from "../types";

/**
 *
 *
 * @param {Event} event
 * @param {CreateAttendancesDto} values
 * @return {Promise<number>}
 */
export const createManyAttendances = async (event: Event, values: CreateAttendancesDto): Promise<number> => {
  const eventId = event.id;
  const { participantName, anonymousParticipantId, attendances } = values;

  try {
    const attendancesToCreate: Omit<PrismaAttendance, "id" | "createdAt" | "updatedAt">[] = attendances.map(attendance => ({
      eventId,
      eventDateId: attendance.eventDateId,
      participantName,
      anonymousParticipantId,
      status: attendance.status
    }));

    const res = await prisma.attendance.createMany({
      data: attendancesToCreate
    });

    return res.count;
  } catch (error) {
    throw error;
  }
};

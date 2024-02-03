import { prisma } from "@/lib/prisma";
import { Attendance as PrismaAttendance } from "@prisma/client";
import { CreateAttendanceRepoDto } from "@/features/api/attendance/types/dto";

/**
 *
 *
 * @param {CreateAttendanceRepoDto[]} values
 * @return {Promise<number>} number of created records
 */
export const createManyAttendances = async (values: CreateAttendanceRepoDto[]): Promise<number> => {
  const attendancesToCreate: Omit<PrismaAttendance, "id" | "createdAt" | "updatedAt">[] = values.map(v => ({
    attendeeName: v.attendeeName,
    anonymousAttendeeId: v.anonymousAttendeeId,
    timeRangeId: v.timeRangeId,
    status: v.attendanceStatus,
  }));

  try {
    const res = await prisma.attendance.createMany({
      data: attendancesToCreate
    });

    return res.count;
  } catch (error) {
    throw error;
  }
};

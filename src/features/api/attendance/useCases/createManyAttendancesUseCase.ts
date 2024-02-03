import { v4 as uuidv4 } from "uuid";
import { CreateAttendancesUseCaseDto, CreateAttendanceRepoDto } from "@/features/api/attendance/types/dto";
import { createManyAttendances } from "@/features/api/attendance/repositories/attendanceRepository";

/**
 *
 *
 * @param {Omit<CreateAttendancesUseCaseDto, "anonymousAttendeeId">} values
 * @return {Promise<number>} number of created records
 */
export const createManyAttendancesUseCase = async (values: Omit<CreateAttendancesUseCaseDto, "anonymousAttendeeId">): Promise<number> => {
  try {
    const attendancesToCreate: CreateAttendanceRepoDto[] = values.attendances.map(att => ({
      ...att,
      attendeeName: values.attendeeName,
      anonymousAttendeeId: uuidv4(),
      timeRangeId: att.timeRangeId,
      attendanceStatus: att.attendanceStatus,
    }))


    return await createManyAttendances(attendancesToCreate);
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Failed to register attendances", error);
  }
};

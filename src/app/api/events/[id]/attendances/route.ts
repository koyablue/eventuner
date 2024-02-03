import { NextRequest, NextResponse } from "next/server";
import { dbConnect, dbDisconnect } from "@/lib/prisma";
import { validateNewAttendances, AttendancesValidationErrors } from "@/features/api/attendance/validation/validators";
import { createManyAttendancesUseCase } from "@/features/api/attendance/useCases/createManyAttendancesUseCase";
import { ApiHandlerResponse } from "@/types/api";
import { AttendanceStatus } from "@/types/models/event";
import { CreateAttendancesUseCaseDto } from "@/features/api/attendance/types/dto";


/**
 * Create attendances
 *
 * @param {NextRequest} req
 * @param {{ params: { uuid: string } }} { params }
 * @param {NextResponse} _res
 * @return {Promise<ApiHandlerResponse<{attendances: Attendance[]}, AttendancesValidationErrors>>}
 */
export const POST = async (
  req: NextRequest,
  _: { params: { id: string } },
  _res: NextResponse
): Promise<ApiHandlerResponse<number, AttendancesValidationErrors>> => {
  try {
    await dbConnect();

    const newAttendancesData = await req.json();

    // Validation
    const validatedFields = validateNewAttendances(newAttendancesData);
    if (!validatedFields.success) {
      return NextResponse.json({
        message: "",
        validationErrors: validatedFields.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const dto: Omit<CreateAttendancesUseCaseDto, "anonymousAttendeeId"> = {
      attendeeName: validatedFields.data.attendeeName,
      // iterate because attendanceStatus needs to be casted
      // just workaround so need to be fixed
      attendances: validatedFields.data.attendances.map(att => ({
        timeRangeId: att.timeRangeId,
        attendanceStatus: att.attendanceStatus as AttendanceStatus,
      }))
    };

    // Save attendances
    const createdCount = await createManyAttendancesUseCase(dto);

    return NextResponse.json({ message: "Success", data: createdCount }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await dbDisconnect();
  }
};

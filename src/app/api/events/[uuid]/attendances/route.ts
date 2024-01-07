import { NextRequest, NextResponse } from "next/server";
import { dbConnect, dbDisconnect } from "@/lib/prisma";
import { validateNewAttendances, AttendancesValidationErrors } from "@/features/api/attendance/validation/validators";
import { createManyAttendancesUseCase } from "@/features/api/attendance/useCases/createManyAttendancesUseCase";
import { ApiHandlerResponse } from "@/types/api";
import { Attendance } from "@/types/models/event";

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
  { params }: { params: { uuid: string } },
  _res: NextResponse
): Promise<ApiHandlerResponse<{attendances: Attendance[]}, AttendancesValidationErrors>> => {
  const { uuid } = params;
  try {
    await dbConnect();

    const newAttendancesData = await req.json();

    const validatedFields = validateNewAttendances(newAttendancesData);
    if (!validatedFields.success) {
      return NextResponse.json({
        message: "",
        validationErrors: validatedFields.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const attendances = await createManyAttendancesUseCase({
      eventUuid: uuid,
      ...validatedFields.data,
    });

    return NextResponse.json({ message: "Success", data: { attendances } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await dbDisconnect();
  }
};

import { NextRequest, NextResponse } from "next/server";
import { ApiHandlerResponse } from "@/types/api";
import { dbConnect, dbDisconnect } from "@/libs/prisma";
import { validateNewEventReq, NewEventValidationErrors } from "@/features/api/event/validation/validators/event";
import { createEventUseCase } from "@/features/api/event/useCases/createEventUseCase";
import { Event } from "@/types/models/event";

/**
 * Create new event
 *
 * @param {NextRequest} req
 * @param {NextResponse} _
 * @return {Promise<ApiHandlerResponse<{event: Event}, NewEventValidationErrors>>}
 */
export const POST = async (
  req: NextRequest,
  _: NextResponse,
): Promise<ApiHandlerResponse<{event: Event}, NewEventValidationErrors>> => {
  try {
    await dbConnect();

    const newEventData = await req.json();

    const validatedFields = validateNewEventReq(newEventData);
    if (!validatedFields.success) {
      return NextResponse.json({
        message: "Failed to create a new event",
        validationErrors: validatedFields.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { name, description, eventDates } = validatedFields.data;

    const event = await createEventUseCase({ name, description, eventDates });

    return NextResponse.json({ message: "Success", data: { event } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await dbDisconnect();
  }
};
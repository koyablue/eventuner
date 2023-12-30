import { NextRequest, NextResponse } from "next/server";
import { UpdateEventValidationErrors, validateUpdateEventReq } from "@/features/api/event/validation/validators";
import { dbConnect, dbDisconnect } from "@/libs/prisma";
import { updateEventUseCase } from "@/features/api/event/useCases/updateEventUseCase";
import { ApiHandlerResponse } from "@/types/api";
import { Event } from "@/types/models/event";

/**
 * Update event
 *
 * @param {NextRequest} req
 * @param {{ params: { id: string } }} { params }
 * @param {NextResponse} _
 * @return {Promise<ApiHandlerResponse<{event: Event}, UpdateEventValidationErrors>>}
 */
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } },
  _: NextResponse
): Promise<ApiHandlerResponse<{event: Event}, UpdateEventValidationErrors>> => {
  const eventId  = Number(params.id);

  const eventData = await req.json();

  try {
    await dbConnect();

    const validatedFields = validateUpdateEventReq(eventData);
    if (!validatedFields.success) {
      return NextResponse.json({
        message: "Failed to update event",
        validationErrors: validatedFields.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const updatedEvent = await updateEventUseCase({
      eventId,
      ...validatedFields.data
    });

    return NextResponse.json({ message: "Success", data: { event: updatedEvent }}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await dbDisconnect();
  }
};

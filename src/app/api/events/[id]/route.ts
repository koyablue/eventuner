import { NextRequest, NextResponse } from "next/server";
import { UpdateEventValidationErrors, validateUpdateEventReq } from "@/features/api/event/validation/validators";
import { dbConnect, dbDisconnect } from "@/lib/prisma";
import { updateEventUseCase } from "@/features/api/event/useCases/updateEventUseCase";
import { ApiHandlerResponse } from "@/types/api";
import { Event } from "@/types/models/event";
import { deleteEventUseCase } from "@/features/api/event/useCases/deleteEventUseCase";

/**
 *
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

/**
 *
 *
 * @param {NextRequest} _req
 * @param {{ params: { id: string } }} { params }
 * @param {NextResponse} _res
 * @return {Promise<ApiHandlerResponse<null, undefined>>}
 */
export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { id: string } },
  _res: NextResponse
): Promise<ApiHandlerResponse<null, undefined>> => {
  const eventId  = Number(params.id);

  try {
    await dbConnect();
    await deleteEventUseCase(eventId);

    return NextResponse.json({ message: "Success", data: null }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await dbDisconnect();
  }
};

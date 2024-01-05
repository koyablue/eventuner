import { NextRequest, NextResponse } from "next/server";
import { getEventByUuidUseCase } from "@/features/api/event/useCases/getEventByUuidUseCase";
import { dbConnect, dbDisconnect } from "@/libs/prisma";
import { ApiHandlerResponse } from "@/types/api";
import { Event } from "@/types/models/event";
import { ModelNotFoundError } from "@/errors/modelNotFoundError";

/**
 * Get event by uuid
 *
 * @param {NextRequest} _req
 * @param {{ params: { uuid: string } }} { params }
 * @param {NextResponse} _res
 * @return {Promise<ApiHandlerResponse<{event: Event}>>}
 */
export const GET = async (
  _req: NextRequest,
  { params }: { params: { uuid: string } },
  _res: NextResponse,
): Promise<ApiHandlerResponse<{event: Event}>> => {
  const { uuid } = params;

  try {
    await dbConnect();

    const event = await getEventByUuidUseCase(uuid);

    return NextResponse.json({ message: "Success", data: {event} }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      { status: error instanceof ModelNotFoundError ? 404 : 500 },
    )
  } finally {
    await dbDisconnect();
  }
};

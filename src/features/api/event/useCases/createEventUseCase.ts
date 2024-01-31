import { Event } from "@/types/models/event";
import { createEvent } from "../repositories/eventRepository";
import { CreateEventDto, CreateEventReqDto } from "../types";

/**
 *
 *
 * @param {CreateEventDto} values
 * @return {Promise<Event>}
 */
export const createEventUseCase = async (values: CreateEventReqDto): Promise<Event> => {
  const dto: CreateEventDto = { ...values };

  try {
    return await createEvent(dto);
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Failed to create new event", error);
  }
};

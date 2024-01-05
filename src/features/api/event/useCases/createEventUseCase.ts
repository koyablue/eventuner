import { Event } from "@/types/models/event";
import { createEvent } from "../repositories/eventRepository";
import { CreateEventDto } from "../types";
import { InternalServerError } from "@/errors/internalServerError";

/**
 *
 *
 * @param {CreateEventDto} values
 * @return {Promise<Event>}
 */
export const createEventUseCase = async (values: CreateEventDto): Promise<Event> => {
  try {
    return await createEvent(values);
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Failed to create new event", error);
  }
};

import { getEventById, updateEvent } from "@/features/api/event/repositories/eventRepository";
import { UpdateEventDto } from "../types/dto";
import { Event } from "@/types/models/event";

/**
 *
 *
 * @param {UpdateEventDto} values
 * @return {Promise<Event>}
 */
export const updateEventUseCase = async (values: UpdateEventDto): Promise<Event> => {
  try {
    const event = await getEventById(values.eventId);
    return await updateEvent(event, values);
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Failed to update event", error);
  }
};

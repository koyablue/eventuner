import { Event } from "@/types/models/event";
import { getEventByUuid } from "../repositories/eventRepository";

/**
 *
 *
 * @param {string} uuid
 * @return {Promise<Event>}
 */
export const getEventByUuidUseCase = async (uuid: string): Promise<Event> => {
  try {
    return await getEventByUuid(uuid);
  } catch (error) {
    console.error(error);
    throw new ModelNotFoundError("Failed to find the event", error);
  }
};

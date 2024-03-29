import { deleteEvent } from "@/features/api/event/repositories/eventRepository";

/**
 *
 *
 * @param {number} id
 */
export const deleteEventUseCase = async (id: number) => {
  try {
    await deleteEvent(id);
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Failed to delete event", error);
  }
};

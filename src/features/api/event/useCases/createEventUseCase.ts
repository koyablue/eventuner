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

  const eventDates = values.eventDates.flatMap(eventDate =>
    eventDate.timeRanges.map(timeRange => ({
      year: eventDate.year,
      month: eventDate.month,
      day: eventDate.day,
      startAt: timeRange.startAt,
      endAt: timeRange.endAt,
    }))
  );

  const dto: CreateEventDto = {
    name: values.name,
    description: values.description,
    eventDates,
  };

  try {
    return await createEvent(dto);
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Failed to create new event", error);
  }
};

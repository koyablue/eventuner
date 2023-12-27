import { prisma } from "@/libs/prisma";
import { v4 as uuidv4 } from "uuid";
import { CreateEventDto } from "../types";
import { createDateTimeObject } from "../services";
import { Event } from "@/types/models/event";

/**
 * Create new event
 *
 * @param {CreateEventRepositoryDto} values
 * @return {Promise<Event>}
 */
export const createEvent = async (values: CreateEventDto): Promise<Event> => {
  const { name, description, eventDates } = values;

  try {
    const event = await prisma.event.create({
      data: {
        uuid: uuidv4(),
        token: uuidv4(),
        name,
        description,
        eventDates: {
          create: eventDates.map(eventDate => ({
            date: eventDate.date,
            startAt: createDateTimeObject(
              eventDate.date,
              eventDate.startAt.hour,
              eventDate.startAt.minutes,
              eventDate.startAt.ampm,
            ),
            endAt: eventDate.endAt && createDateTimeObject(
              eventDate.date,
              eventDate.endAt.hour,
              eventDate.endAt.minutes,
              eventDate.endAt.ampm,
            )
          }))
        }
      },
      include: {
        eventDates: true,
      },
    });

    const res: Event = {
      id: event.id,
      uuid: event.uuid,
      token: event.token,
      name: event.name,
      description: event.description,
      eventDates: event.eventDates.map(eventDate => ({
        id: eventDate.id,
        eventId: eventDate.eventId,
        date: eventDate.date,
        startAt: eventDate.startAt,
        endAt: eventDate.endAt,
        createdAt: eventDate.createdAt,
        updatedAt: eventDate.updatedAt,
      })),
      attendances: [],
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };

    return res;
  } catch (error) {
    throw error;
  }
};

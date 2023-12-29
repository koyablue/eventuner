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
            date: new Date(eventDate.year, eventDate.month - 1, eventDate.month),
            startAt: createDateTimeObject({
              year: eventDate.year,
              month: eventDate.month,
              day: eventDate.day,
              hour: eventDate.startAt.hour,
              minutes: eventDate.startAt.minutes,
              ampm: eventDate.startAt.ampm,
            }),
            endAt: eventDate.endAt && createDateTimeObject({
              year: eventDate.year,
              month: eventDate.month,
              day: eventDate.day,
              hour: eventDate.endAt.hour,
              minutes: eventDate.endAt.minutes,
              ampm: eventDate.endAt.ampm,
            })
          }))
        }
      },
      include: {
        eventDates: true,
      },
    });

    // timezone is UTC so convert it into local timezone in client component
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

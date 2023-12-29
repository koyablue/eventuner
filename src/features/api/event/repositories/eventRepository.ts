import { prisma } from "@/libs/prisma";
import { v4 as uuidv4 } from "uuid";
import { CreateEventDto } from "../types";
import { createDateTimeObject } from "../services";
import { Event } from "@/types/models/event";
import { prismaEventToEventModel } from "./utils";

/**
 *
 *
 * @param {string} uuid
 * @return {Promise<Event>}
 */
export const getEventByUuid = async (uuid: string): Promise<Event> => {
  try {
    const event = await prisma.event.findFirstOrThrow({
      where: { uuid },
      include: { eventDates: true, attendances: true }
    });

    return prismaEventToEventModel(event);
  } catch (error) {
    throw error;
  }
};

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
    return prismaEventToEventModel(event);
  } catch (error) {
    throw error;
  }
};

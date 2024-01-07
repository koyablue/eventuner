import { v4 as uuidv4 } from "uuid";
import { EventDate as PrismaEventDate } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CreateEventDto, UpdateEventDto } from "../types";
import { createDateTimeObject } from "../services";
import { Event } from "@/types/models/event";
import { prismaEventToEventModel } from "./utils";

/**
 * Get by id
 *
 * @param {number} id
 * @return {Promise<Event>}
 */
export const getEventById = async (id: number): Promise<Event> => {
  try {
    const event = await prisma.event.findFirstOrThrow({
      where: { id },
      include: { eventDates: true, attendances: true }
    });

    return prismaEventToEventModel(event);
  } catch (error) {
    throw error;
  }
};

/**
 * Get by UUID
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

/**
 * Update event
 *
 * @param {Event} event
 * @param {UpdateEventDto} values
 * @return {Promise<Event>}
 */
export const updateEvent = async (event: Event, values: UpdateEventDto): Promise<Event> => {
  const { name, description, keepDateIds, addedDates } = values;
  const currentEventDateIds = event.eventDates.map(eventDate => eventDate.id);
  const eventDateIdsToDelete = currentEventDateIds.filter(eventDateId => !keepDateIds.includes(eventDateId));

  try {
    const updatedEvent = await prisma.$transaction(async (prisma) => {
      // create new event dates
      if (addedDates && addedDates.length) {
        const eventDateToCreate: Omit<PrismaEventDate, "id" | "createdAt" | "updatedAt">[] = addedDates.map(eventDate => ({
          eventId: event.id,
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
        }));

        await prisma.eventDate.createMany({ data: eventDateToCreate });
      }

      // delete removed event dates
      await prisma.eventDate.deleteMany({
        where: { id: { in: eventDateIdsToDelete } }
      });

      const updatedEvent = await prisma.event.update({
        where: { id: event.id },
        data: { name, description },
        include: { eventDates: true, attendances: true }
      });

      return updatedEvent
    });

    return prismaEventToEventModel(updatedEvent);
  } catch (error) {
    throw error;
  }
};

/**
 * Delete event
 *
 * @param {number} id
 * @return {Promise<void>}
 */
export const deleteEvent = async (id: number) => {
  try {
    await prisma.event.delete({ where: { id } });
  } catch (error) {
    throw error;
  }
};

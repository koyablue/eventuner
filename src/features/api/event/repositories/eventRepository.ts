import { v4 as uuidv4 } from "uuid";
import { EventDate as PrismaEventDate } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CreateEventDto, UpdateEventDto } from "@/features/api/event/types/dto";
import { createDateTimeObj } from "@/features/api/event/services";
import { convertEvent } from "@/features/api/event/repositories/utils";
import { Event } from "@/types/models/event";

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
      include: {
        eventDates: {
          orderBy: { date: "asc" },
          include: {
            timeRanges: { include: { attendances: true } }
          }
        }
      }
    });

    return convertEvent(event);
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
      include: {
        eventDates: {
          orderBy: { date: "asc" },
          include: {
            timeRanges: {
              orderBy: { startAt: "asc" },
              include: { attendances: true }
            }
          }
        }
      }
    });

    return convertEvent(event);
  } catch (error) {
    throw error;
  }
};


/**
 * Create new event
 *
 * @param {CreateEventDto} values
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

        // Create relation model EventDate
        eventDates: {
          create: eventDates.map(eventDate => ({
            date: new Date(eventDate.year, eventDate.month - 1, eventDate.day),
            timeRanges: {
              create: eventDate.timeRanges.map(timeRange => ({
                startAt: createDateTimeObj({
                  year: eventDate.year,
                  month: eventDate.month,
                  day: eventDate.day,
                  ...timeRange.startAt,
                }),
                endAt: timeRange.endAt
                  ? createDateTimeObj({
                      year: eventDate.year,
                      month: eventDate.month,
                      day: eventDate.day,
                      ...timeRange.endAt,
                    })
                  : null,
              }))
            }
          }))
        }
      },
      include: {
        eventDates: {
          include: { timeRanges: true }
        },
      },
    });

    // timezone is UTC so convert it into local timezone in client component
    return convertEvent(event);
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
          timeRanges: {
            create: eventDate.timeRanges.map(timeRange => ({
              startAt: createDateTimeObj({
                year: eventDate.year,
                month: eventDate.month,
                day: eventDate.day,
                ...timeRange.startAt,
              }),
              endAt: timeRange.endAt
                ? createDateTimeObj({
                    year: eventDate.year,
                    month: eventDate.month,
                    day: eventDate.day,
                    ...timeRange.endAt,
                  })
                : null,
            }))
          }
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
        include: {
          eventDates: {
            include: {
              timeRanges: { include: { attendances: true } }
            }
          }
        }
      });

      return updatedEvent
    });

    return convertEvent(updatedEvent);
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

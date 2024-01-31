import {Prisma, Event as PrismaEvent } from "@prisma/client";
import { Attendance, Event, EventDate } from "@/types/models/event";
import { AttendanceStatus } from "@/types/event";

type PrismaEventWithEventDates = Prisma.EventGetPayload<{
  include: { eventDates: { include: { timeRanges: true } } }
}>;

type PrismaEventWithAttendances = Prisma.EventGetPayload<{
  include: { attendances: true }
}>;

type PrismaEventWithEventDatesAndAttendances = Prisma.EventGetPayload<{
  include: { eventDates: { include: { timeRanges: true } }, attendances: true }
}>;

/**
 * Convert PrismaEvent to application's Event obj
 *
 * @param {(PrismaEvent
 *     | PrismaEventWithEventDates
 *     | PrismaEventWithAttendances
 *     | PrismaEventWithEventDatesAndAttendances)} prismaEvent
 * @return {Event}
 */
export const prismaEventToEventModel = (
  prismaEvent:
    | PrismaEvent
    | PrismaEventWithEventDates
    | PrismaEventWithAttendances
    | PrismaEventWithEventDatesAndAttendances
): Event => {
  const event: Event = {
    id: prismaEvent.id,
    uuid: prismaEvent.uuid,
    token: prismaEvent.token,
    name: prismaEvent.name,
    description: prismaEvent.description,
    eventDates: [],
    attendances: [],
    createdAt: prismaEvent.createdAt,
    updatedAt: prismaEvent.updatedAt,
  };

  if ("eventDates" in prismaEvent) {
    event.eventDates = prismaEvent.eventDates.map(eventDate => {
      const converted: EventDate = {
        id: eventDate.id,
        eventId: eventDate.eventId,
        date: eventDate.date,
        timeRanges: eventDate.timeRanges,
        createdAt: eventDate.createdAt,
        updatedAt: eventDate.updatedAt,
      };
      if ("attendances" in eventDate) {
        converted.attendances = eventDate.attendances as Attendance[];
      }
      return converted;
    });
  }

  if ("attendances" in prismaEvent) {
    event.attendances = prismaEvent.attendances.map(attendance => ({
      id: attendance.id,
      eventId: attendance.eventDateId,
      eventDateId: attendance.eventDateId,
      attendeeName: attendance.attendeeName,
      anonymousAttendeeId: attendance.anonymousAttendeeId,
      status: attendance.status as AttendanceStatus,
      createdAt: attendance.createdAt,
      updatedAt: attendance.updatedAt
    }));
  }

  return event;
}

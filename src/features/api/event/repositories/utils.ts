import {
  Prisma,
  Event as PrismaEvent,
  EventDate as PrismaEventDate,
  TimeRange as PrismaTimeRange,
  Attendance as PrismaAttendance,
} from "@prisma/client";
import { Event, EventDate, TimeRange, Attendance } from "@/types/models/event";
import { isAttendanceStatus } from "@/types/models/event";

/**
 * Convert Prisma Attendance model into application's Attendance model
 *
 * @param {PrismaAttendance} prismaAttendance
 * @return {Attendance}
 */
const convertAttendance = (prismaAttendance: PrismaAttendance): Attendance => {
  // Validate attendance status
  if (!isAttendanceStatus(prismaAttendance.status)) {
    throw new Error("Invalid attendance status");
  }

  return {
    id: prismaAttendance.id,
    timeRangeId: prismaAttendance.timeRangeId,
    attendeeName: prismaAttendance.attendeeName,
    anonymousAttendeeId: prismaAttendance.anonymousAttendeeId,
    status: prismaAttendance.status,
    createdAt: prismaAttendance.createdAt,
    updatedAt: prismaAttendance.updatedAt
  };
};

/**
 * Convert Prisma TimeRange model into application's TimeRange model
 *
 * @param {(PrismaTimeRange
 *     | Prisma.TimeRangeGetPayload<{ include: { attendances: true } }>)} prismaTimeRange
 * @return {TimeRange}
 */
const convertTimeRange = (
  prismaTimeRange:
    | PrismaTimeRange
    | Prisma.TimeRangeGetPayload<{ include: { attendances: true } }>
): TimeRange => {
  if ("attendances" in prismaTimeRange) {
    return {
      startAt: prismaTimeRange.startAt,
      endAt: prismaTimeRange.endAt,
      attendances: prismaTimeRange.attendances.map(convertAttendance),
    };
  }
  return {
    startAt: prismaTimeRange.startAt,
    endAt: prismaTimeRange.endAt,
  };
};

/**
 * Convert Prisma TimeRange model into application's TimeRange model
 *
 * @param {(PrismaEventDate
 *     | Prisma.EventDateGetPayload<{ include: { timeRanges: true } }>)} prismaEventDate
 * @return {EventDate}
 */
const convertEventDate = (
  prismaEventDate:
    | PrismaEventDate
    | Prisma.EventDateGetPayload<{ include: { timeRanges: true } }>
): EventDate => {
  const eventDate = {
    id: prismaEventDate.id,
    eventId: prismaEventDate.eventId,
    date: prismaEventDate.date,
    timeRanges: [] as TimeRange[],
    createdAt: prismaEventDate.createdAt,
    updatedAt: prismaEventDate.updatedAt
  };

  if ("timeRanges" in prismaEventDate) {
    eventDate.timeRanges = prismaEventDate.timeRanges.map(convertTimeRange)
  }

  return eventDate;
};

/**
 * Convert Prisma Event model into application's Event model
 *
 * @param {(PrismaEvent
 *     | Prisma.EventGetPayload<{ include: { eventDates: true } }>)} prismaEvent
 * @return {Event}
 */
export const convertEvent = (
  prismaEvent:
    | PrismaEvent
    | Prisma.EventGetPayload<{ include: { eventDates: true } }>
): Event => {
  const event = {
    id: prismaEvent.id,
    uuid: prismaEvent.uuid,
    token: prismaEvent.token,
    name: prismaEvent.name,
    description: prismaEvent.description,
    eventDates: [] as EventDate[],
    createdAt: prismaEvent.createdAt,
    updatedAt: prismaEvent.updatedAt,
  };

  if ("eventDates" in prismaEvent) {
    event.eventDates = prismaEvent.eventDates.map(convertEventDate);
  }

  return event;
};

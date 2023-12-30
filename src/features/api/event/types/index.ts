import { AmPmString } from "@/types/event";

type EventDateTime = {
  hour: number
  minutes: number
  ampm: AmPmString
}

type EventDate = {
  year: number
  month: number
  day: number
  startAt: EventDateTime
  endAt: EventDateTime | null
};

export type CreateEventDto = {
  name: string
  description?: string | null
  eventDates: EventDate[]
}

export type UpdateEventDto = {
  eventId: number
  name: string
  description?: string | null
  keepDateIds: number[]
  addedDates?: EventDate[]
};

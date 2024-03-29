import { AmPmString } from "@/types/models/event";

type EventDateTime = {
  hour: number
  minutes: number
  ampm: AmPmString
}

// For controller -> useCase data transfer
export type CreateEventReqDto = {
  name: string
  description?: string | null
  eventDates: {
    year: number
    month: number
    day: number
    timeRanges: {
      startAt: EventDateTime
      endAt?: EventDateTime | null
    }[]
  }[]
}

type TimeRange = {
  startAt: EventDateTime;
  endAt?: EventDateTime | null;
};

type EventDate = {
  year: number;
  month: number;
  day: number;
  timeRanges: TimeRange[]
};

// For useCase -> repository data transfer
export type CreateEventDto = {
  name: string
  description?: string | null
  eventDates: EventDate[]
};

export type UpdateEventDto = {
  eventId: number
  name: string
  description?: string | null
  keepDateIds: number[]
  addedDates?: EventDate[]
};

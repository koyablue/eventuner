import { AmPmString } from "@/types/event";

type EventDateTime = {
  hour: number
  minutes: number
  ampm: AmPmString
}

export type CreateEventDto = {
  name: string
  description?: string | null
  eventDates: {
    year: number
    month: number
    day: number
    startAt: EventDateTime
    endAt: EventDateTime | null
  }[]
}

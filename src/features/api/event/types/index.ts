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
    date: Date
    startAt: EventDateTime
    endAt: EventDateTime | null
  }[]
}

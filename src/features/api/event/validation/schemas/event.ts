import { z } from "zod";

export const AmPmSchema = z.union([
  z.literal("am"),
  z.literal("pm")
]);

export const TimeSchema = z.object({
  hour: z.coerce.number().min(1).max(12),
  minutes: z.coerce.number().min(0).max(59),
  ampm: AmPmSchema,
});

export const EventDateSchema = z.object({
  date: z.coerce.date(),
  startAt: TimeSchema,
  endAt: TimeSchema.nullable()
});

export const NewEventSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().nullable(),
  eventDates: z.array(EventDateSchema).nonempty()
});

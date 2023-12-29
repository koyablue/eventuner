import { z } from "zod";
import { validateDate } from "@/features/api/event/validation/validators/event";

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
  year: z.number().min(new Date().getFullYear()),
  month: z.number().min(1).max(12),
  day: z.number().min(1).max(31),
  startAt: TimeSchema,
  endAt: TimeSchema.nullable()
}).refine(data => validateDate(data.year, data.month, data.day), {
  message: "The date is invalid"
});

export const NewEventSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().nullable(),
  eventDates: z.array(EventDateSchema).nonempty()
});

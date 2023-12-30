import { number, z } from "zod";
import { validateDate } from "@/features/api/event/validation/validators";

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

const EventNameSchema = z.string().min(1).max(100);

const EventDescriptionSchema = z.string().nullable().optional();

const EventDatesSchema = z.array(EventDateSchema);

// Validation schema for creating new event
export const NewEventSchema = z.object({
  name: EventNameSchema,
  description: EventDescriptionSchema,
  eventDates: EventDatesSchema.nonempty(),
});

// Validation schema for updating event
export const UpdateEventSchema = z.object({
  name: EventNameSchema,
  description: EventDescriptionSchema,
  keepDateIds: z.array(z.number()),
  addedDates: EventDatesSchema.optional(),
});

import { z } from "zod";

const EventFormTimeSchema = z.object({
  hour: z.coerce.number().min(1).max(12),
  minutes: z.coerce.number().min(0).max(59),
  ampm: z.union([
    z.literal("am"),
    z.literal("pm"),
  ])
});

const EventFormTimeRangeSchema = z.object({
  start: EventFormTimeSchema,
  end: EventFormTimeSchema.optional()
});

const EventFormScheduleDateSchema = z.object({
  year: z.number().min(new Date().getFullYear()),
  month: z.number().min(1).max(12),
  day: z.number().min(1).max(31),
  timeRanges: z.array(EventFormTimeRangeSchema),
});

export const NewEventFormSchema = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  scheduleDates: z.array(EventFormScheduleDateSchema),
});

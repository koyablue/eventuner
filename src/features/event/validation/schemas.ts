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
  startAt: EventFormTimeSchema,
  endAt: EventFormTimeSchema.optional()
}, { invalid_type_error: "Invalid time" });

const EventFormDaySchema = z.object({
  year: z.number().min(new Date().getFullYear()),
  month: z.number().min(1).max(12),
  day: z.number().min(1).max(31),
});

const EventFormEventDateSchema = z.object({
  year: z.number().min(new Date().getFullYear()),
  month: z.number().min(1).max(12),
  day: z.number().min(1).max(31),
  timeRanges: z.array(EventFormTimeRangeSchema),
});

// Form request validation for creating new event
export const NewEventFormSchema = z.object({
  name: z
    .string({
      required_error: "Event name is required",
      invalid_type_error: "Event name is invalid",
    })
    .min(1, { message: "Please enter the event name" })
    .max(100, { message: "Event name must be less than 100 characters" }),
  description: z
    .string({
      invalid_type_error: "Event description is invalid",
    })
    .nullable()
    .optional(),
  eventDates: z
    .array(EventFormEventDateSchema)
    .nonempty({ message: "Please select dates" }),
});

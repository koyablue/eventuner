import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { AmPmString } from "@/types/event";
import { toYMDStr } from "@/utils";

type Time = {
  hour?: number
  minutes?: number
  ampm?: AmPmString
};

export type ExistingTimeRange = {
  id: number;
  startAt: Time
  endAt?: Time
};
export const isExistingTimeRange = (timeRange: TimeRange): timeRange is ExistingTimeRange => {
  return "id" in timeRange;
}

export type NewTimeRange = {
  uuid: string;
  startAt: Time;
  endAt?: Time;
};
export const isNewTimeRange = (timeRange: TimeRange): timeRange is NewTimeRange => {
  return "uuid" in timeRange;
};

export type TimeRange = ExistingTimeRange | NewTimeRange;

export type EventDate = {
  date: string; // yyyy-mm-dd string
  timeRanges: TimeRange[];
};

type EventDateState = {
  eventDates: EventDate[];
};

interface EventDateStore extends EventDateState {
  addDate: (newDate: { date: Date, timeRanges: Omit<NewTimeRange, "uuid">[] }) => void;
  removeDate: (dateToRemove: Date) => void;
  addTimeRangeToDate: (date: Date, newTimeRange: Omit<NewTimeRange, "uuid">) => void;
  updateTimeRange: (date: Date, timeRangeToUpdate: TimeRange) => void;
  removeTimeRangeFromDate: (date: Date, timeRangeToRemove: TimeRange) => void;
  removeTimeRangeAndDateIfEmpty: (date: Date, timeRangeToRemove: TimeRange) => void;
  resetDates: () => void;
}

export const useEventDateStore = create<EventDateStore>()(devtools(
  set => ({
    eventDates: [],

    addDate: (newDate) =>
      set((state) => {
        const timeRanges: TimeRange[] = newDate.timeRanges.map(timeRange => ({ ...timeRange, uuid: uuidv4() }));
        return {
          eventDates: [...state.eventDates, { date: toYMDStr(newDate.date), timeRanges }]
        };
      }),

    removeDate: (dateToRemove) =>
      set((state) => ({
        eventDates: state.eventDates.filter(date => date.date !== toYMDStr(dateToRemove))
      })),

    addTimeRangeToDate: (date, newTimeRange) =>
      set((state) => ({
        eventDates: state.eventDates.map(eventDate =>
          eventDate.date === toYMDStr(date)
            ? { ...eventDate, timeRanges: [...eventDate.timeRanges, { ...newTimeRange, uuid: uuidv4() }] }
            : eventDate
        )
      })),

    updateTimeRange: (date, timeRangeToUpdate) =>
      set((state) => {
        return {
          eventDates: state.eventDates.map(eventDate => {
            if (eventDate.date === toYMDStr(date)) {
              return {
                ...eventDate,
                timeRanges: eventDate.timeRanges.map(timeRange => {
                  if (isNewTimeRange(timeRangeToUpdate) && isNewTimeRange(timeRange) && timeRange.uuid === timeRangeToUpdate.uuid) {
                    return timeRangeToUpdate;
                  }
                  else if (isExistingTimeRange(timeRangeToUpdate) && isExistingTimeRange(timeRange) && timeRange.id === timeRangeToUpdate.id) {
                    return timeRangeToUpdate;
                  }
                  return timeRange;
                })
              };
            }
            return eventDate;
          })
        };
      }),

    removeTimeRangeFromDate: (date, timeRangeToRemove) =>
      set((state) => ({
        eventDates: state.eventDates.map(eventDate =>
          eventDate.date === toYMDStr(date)
            ? { ...eventDate, timeRanges: eventDate.timeRanges.filter(tr => tr !== timeRangeToRemove) }
            : eventDate
        )
      })),

      removeTimeRangeAndDateIfEmpty: (date: Date, timeRangeToRemove: TimeRange) =>
        set((state) => {
          const updatedEventDates = state.eventDates.map(eventDate => {
            if (eventDate.date === toYMDStr(date)) {
              return {
                ...eventDate,
                timeRanges: eventDate.timeRanges.filter(tr => {
                  if (isNewTimeRange(timeRangeToRemove)) {
                    return (tr as NewTimeRange).uuid !== timeRangeToRemove.uuid;
                  } else if (isExistingTimeRange(tr)) {
                    return tr.id !== timeRangeToRemove.id;
                  }
                  // return false;
                })
              };
            }
            return eventDate;
          });

          const finalEventDates = updatedEventDates.filter(eventDate => !(eventDate.date === toYMDStr(date) && eventDate.timeRanges.length === 0));

          return { eventDates: finalEventDates };
        }),

      resetDates: () => set(() => ({ eventDates: [] })),
}), { name: "scheduleStore" }));

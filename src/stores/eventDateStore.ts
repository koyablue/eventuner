import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { AmPmString } from '@/types/event';
import { toYMDStr } from '@/utils';

type Time = {
  hour?: number
  minutes?: number
  ampm?: AmPmString
};

export type TimeRange = {
  id: string; // for key prop in JSX
  startAt: Time
  endAt?: Time
};

export type EventDate = {
  date: string; // yyyy-mm-dd string
  timeRanges: TimeRange[];
};

type EventDateState = {
  eventDates: EventDate[];
};

interface EventDateStore extends EventDateState {
  addDate: (newDate: { date: Date, timeRanges: Omit<TimeRange, 'id'>[] }) => void;
  removeDate: (dateToRemove: Date) => void;
  addTimeRangeToDate: (date: Date, newTimeRange: Omit<TimeRange, 'id'>) => void;
  removeTimeRangeFromDate: (date: Date, timeRangeToRemove: TimeRange) => void;
  removeTimeRangeAndDateIfEmpty: (date: Date, timeRangeToRemove: TimeRange) => void;
}

export const useEventDateStore = create<EventDateStore>()(devtools(
  set => ({
    eventDates: [],

    addDate: (newDate) =>
      set((state) => {
        const timeRanges: TimeRange[] = newDate.timeRanges.map(timeRange => ({ ...timeRange, id: uuidv4() }));
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
        eventDates: state.eventDates.map(sd =>
          sd.date === toYMDStr(date)
            ? { ...sd, timeRanges: [...sd.timeRanges, { ...newTimeRange, id: uuidv4() }] }
            : sd
        )
      })),

    removeTimeRangeFromDate: (date, timeRangeToRemove) =>
      set((state) => ({
        eventDates: state.eventDates.map(sd =>
          sd.date === toYMDStr(date)
            ? { ...sd, timeRanges: sd.timeRanges.filter(tr => tr !== timeRangeToRemove) }
            : sd
        )
      })),

    removeTimeRangeAndDateIfEmpty: (date: Date, timeRangeToRemove: TimeRange) =>
      set((state) => {
        // remove timeRange
        const updatedEventDates = state.eventDates.map(sd =>
          sd.date === toYMDStr(date)
            ? { ...sd, timeRanges: sd.timeRanges.filter(tr => tr.id !== timeRangeToRemove.id) }
            : sd
        );

        // remove date that has empty timeRanges
        const finalEventDates = updatedEventDates.filter(sd => !(sd.date === toYMDStr(date) && sd.timeRanges.length === 0));

        return { eventDates: finalEventDates };
      }),
}), { name: 'scheduleStore' }));

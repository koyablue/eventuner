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

export type ScheduleDate = {
  date: string; // yyyy-mm-dd string
  timeRanges: TimeRange[];
};

type ScheduleState = {
  scheduleDates: ScheduleDate[];
};

interface ScheduleStore extends ScheduleState {
  addDate: (newDate: { date: Date, timeRanges: Omit<TimeRange, 'id'>[] }) => void;
  removeDate: (dateToRemove: Date) => void;
  addTimeRangeToDate: (date: Date, newTimeRange: Omit<TimeRange, 'id'>) => void;
  removeTimeRangeFromDate: (date: Date, timeRangeToRemove: TimeRange) => void;
  removeTimeRangeAndDateIfEmpty: (date: Date, timeRangeToRemove: TimeRange) => void;
}

export const useScheduleStore = create<ScheduleStore>()(devtools(
  set => ({
    scheduleDates: [],

    addDate: (newDate) =>
      set((state) => {
        const timeRanges: TimeRange[] = newDate.timeRanges.map(timeRange => ({ ...timeRange, id: uuidv4() }));
        return {
          scheduleDates: [...state.scheduleDates, { date: toYMDStr(newDate.date), timeRanges }]
        };
      }),

    removeDate: (dateToRemove) =>
      set((state) => ({
        scheduleDates: state.scheduleDates.filter(date => date.date !== toYMDStr(dateToRemove))
      })),

    addTimeRangeToDate: (date, newTimeRange) =>
      set((state) => ({
        scheduleDates: state.scheduleDates.map(sd =>
          sd.date === toYMDStr(date)
            ? { ...sd, timeRanges: [...sd.timeRanges, { ...newTimeRange, id: uuidv4() }] }
            : sd
        )
      })),

    removeTimeRangeFromDate: (date, timeRangeToRemove) =>
      set((state) => ({
        scheduleDates: state.scheduleDates.map(sd =>
          sd.date === toYMDStr(date)
            ? { ...sd, timeRanges: sd.timeRanges.filter(tr => tr !== timeRangeToRemove) }
            : sd
        )
      })),

    removeTimeRangeAndDateIfEmpty: (date: Date, timeRangeToRemove: TimeRange) =>
      set((state) => {
        // remove timeRange
        const updatedScheduleDates = state.scheduleDates.map(sd =>
          sd.date === toYMDStr(date)
            ? { ...sd, timeRanges: sd.timeRanges.filter(tr => tr.id !== timeRangeToRemove.id) }
            : sd
        );

        // remove date that has empty timeRanges
        const finalScheduleDates = updatedScheduleDates.filter(sd => !(sd.date === toYMDStr(date) && sd.timeRanges.length === 0));

        return { scheduleDates: finalScheduleDates };
      }),
}), { name: 'scheduleStore' }));

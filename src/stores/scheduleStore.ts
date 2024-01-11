import { create } from 'zustand';
import { AmPmString } from '@/types/event';

type Time = {
  hours?: number
  minutes?: number
  ampm?: AmPmString
};

type TimeRange = {
  start: Time
  end?: Time
};

type ScheduleDate = {
  date: string;
  timeRanges: TimeRange[];
};

type ScheduleState = {
  scheduleDates: ScheduleDate[];
};

interface ScheduleStore extends ScheduleState {
  addDate: (newDate: ScheduleDate) => void;
  removeDate: (dateToRemove: string) => void;
  addTimeRangeToDate: (date: string, newTimeRange: TimeRange) => void;
  removeTimeRangeFromDate: (date: string, timeRangeToRemove: TimeRange) => void;
}

export const useScheduleStore = create<ScheduleStore>(set => ({
  scheduleDates: [],

  addDate: (newDate) =>
    set((state) => ({ scheduleDates: [...state.scheduleDates, newDate] })),

  removeDate: (dateToRemove) =>
    set((state) => ({
      scheduleDates: state.scheduleDates.filter(date => date.date !== dateToRemove)
    })),

  addTimeRangeToDate: (date, newTimeRange) =>
    set((state) => ({
      scheduleDates: state.scheduleDates.map(sd =>
        sd.date === date
          ? { ...sd, timeRanges: [...sd.timeRanges, newTimeRange] }
          : sd
      )
    })),

  removeTimeRangeFromDate: (date, timeRangeToRemove) =>
    set((state) => ({
      scheduleDates: state.scheduleDates.map(sd =>
        sd.date === date
          ? { ...sd, timeRanges: sd.timeRanges.filter(tr => tr !== timeRangeToRemove) }
          : sd
      )
    })),
}));

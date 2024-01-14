import { useState, useEffect } from 'react';
import { parseISO } from 'date-fns';
import { useScheduleStore } from '@/stores/scheduleStore';
import { Calendar as CalendarUi, type CalendarProps } from '@/components/ui/calendar';
import { CalendarFooter } from './CalendarFooter';

type CalendarPropsType = Omit<
  CalendarProps,
  | 'selected'
  | 'mode'
  | 'footer'
>

export const Calendar = (props: CalendarPropsType) => {
  const { scheduleDates } = useScheduleStore();
  // State for selected days in the calendar
  const [calendarSelectedDays, setCalendarSelectedDays] = useState<Date[] | undefined>();

  useEffect(() => {
    // Update calendar selection status based on the store
    const updatedSelectedDays = scheduleDates.map(scheduleDate => parseISO(scheduleDate.date));
    setCalendarSelectedDays(updatedSelectedDays);
  }, [scheduleDates]);

  return (
    <CalendarUi
      mode='multiple'
      selected={calendarSelectedDays}
      footer={<CalendarFooter daysCount={calendarSelectedDays?.length || 0} />}
      {...props}
    />
  );
};

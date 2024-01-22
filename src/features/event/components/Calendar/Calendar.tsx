import { useState, useEffect } from 'react';
import { parseISO } from 'date-fns';
import { useEventDateStore } from '@/stores/eventDateStore';
import { Calendar as CalendarUi, type CalendarProps } from '@/components/ui/calendar';
import { CalendarFooter } from './CalendarFooter';

type CalendarPropsType = Omit<
  CalendarProps,
  | 'selected'
  | 'mode'
  | 'footer'
>

export const Calendar = (props: CalendarPropsType) => {
  const { eventDates } = useEventDateStore();
  // State for selected days in the calendar
  const [calendarSelectedDays, setCalendarSelectedDays] = useState<Date[] | undefined>();

  useEffect(() => {
    // Update calendar selection status based on the store
    const updatedSelectedDays = eventDates.map(eventDate => parseISO(eventDate.date));
    setCalendarSelectedDays(updatedSelectedDays);
  }, [eventDates]);

  return (
    <CalendarUi
      mode='multiple'
      selected={calendarSelectedDays}
      footer={<CalendarFooter daysCount={calendarSelectedDays?.length || 0} />}
      {...props}
    />
  );
};

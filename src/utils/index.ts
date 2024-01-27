import { format, parseISO } from 'date-fns';
import { AmPmString } from '@/types/event';

/**
 *
 *
 * @param {Date} date
 * @return {{ hour: number, minutes: number, ampm: AmPmString }}
 */
export const extract12HourFormat = (date: Date): { hour: number, minutes: number, ampm: AmPmString } => {
  let hour = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12 || 12;

  return { hour, minutes, ampm };
};

/**
 * Date to yyyy-mm-dd
 *
 * @param {Date} date
 * @return {string}
 */
export const toYMDStr = (date: Date): string => format(date, 'y-MM-dd');

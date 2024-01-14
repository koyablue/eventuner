import { format, parseISO } from 'date-fns';
import { AmPmString } from '@/types/event';

/**
 *
 *
 * @param {Date} date
 * @return {{ hours: number, minutes: number, ampm: AmPmString }}
 */
export const extract12HourFormat = (date: Date): { hours: number, minutes: number, ampm: AmPmString } => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;

  return { hours, minutes, ampm };
};

/**
 * Date to yyyy-mm-dd
 *
 * @param {Date} date
 * @return {string}
 */
export const toYMDStr = (date: Date): string => format(date, 'y-MM-dd');

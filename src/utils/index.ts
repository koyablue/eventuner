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

/**
 * Get ordinal suffix of num
 * ex) num = 1 -> "st"
 *
 * @param {number} num
 * @return {string}
 */
export const getOrdinalSuffix = (num: number): string => {
  let suffix = "th";

  if (num % 10 === 1 && num % 100 !== 11) {
    suffix = "st";
  } else if (num % 10 === 2 && num % 100 !== 12) {
    suffix = "nd";
  } else if (num % 10 === 3 && num % 100 !== 13) {
    suffix = "rd";
  }

  return suffix;
};

/**
 * Convert number to ordinal number
 *
 * @param {number} num
 * @return {string} 1st, 2nd, 3rd etc.
 */
export const toOrdinal = (num: number): string => `${num}${getOrdinalSuffix(num)}`;

import { AmPmString } from '@/types/event';

/**
 * Add hours to date object
 *
 * @param {Date} date
 * @param {number} hours
 * @return {Date}
 */
export const addHoursToDate = (date: Date, hours: number): Date => {
  const milliSecondsToAdd = hours * 60 * 60 * 1000;
  date.setTime(date.getTime() + milliSecondsToAdd);
  return date;
}

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
export const toYMDStr = (date: Date) => date.toISOString().split('T')[0];

/**
 * From yyyy-mm-dd to Date object
 *
 * @param {string} dateString
 * @return {Date}
 */
export const parseYMDStr = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

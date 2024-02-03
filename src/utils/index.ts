import { format } from 'date-fns';

/**
 * Date to yyyy-mm-dd
 *
 * @param {Date} date
 * @return {string}
 */
export const toYMDStr = (date: Date): string => format(date, 'y-MM-dd');

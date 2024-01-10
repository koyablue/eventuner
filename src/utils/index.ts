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

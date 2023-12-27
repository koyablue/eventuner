import { AmPmString } from "@/types/event";

/**
 * ex) new Date("2022-07-05"), 6, 5, "pm"
 * -> Date obj of 2022-07-05 18:05
 *
 * @param {Date} dateObject
 * @param {number} hour
 * @param {number} minutes
 * @param {AmPmString} ampm
 * @return {Date}
 */
export const createDateTimeObject = (
  dateObject: Date,
  hour: number,
  minutes: number,
  ampm: AmPmString
): Date => {
  // 12 hours -> 24 hours
  let hour24 = hour;
  if (ampm === "pm" && hour < 12) {
    hour24 += 12;
  } else if (ampm === "am" && hour === 12) {
    hour24 = 0;
  }

  const newDate = new Date(dateObject);
  newDate.setHours(hour24, minutes, 0);

  return newDate;
}

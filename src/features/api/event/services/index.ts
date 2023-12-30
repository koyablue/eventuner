import { AmPmString } from "@/types/event";

type CreateDateTimeObjParams = {
  year: number,
  month: number,
  day: number,
  hour: number,
  minutes: number,
  ampm: AmPmString
};

/**
 * ex) {2022, 7, 5, 6, 5, "pm}
 * -> Date obj of 2022-07-05 18:05
 *
 *
 * @param {CreateDateTimeObjParams} {
 *   year,
 *   month,
 *   day,
 *   hour,
 *   minutes,
 *   ampm,
 * }
 * @return {Date}
 */
export const createDateTimeObject = ({
  year,
  month,
  day,
  hour,
  minutes,
  ampm,
}: CreateDateTimeObjParams): Date => {
  // 12 hours -> 24 hours
  let hour24 = hour;
  if (ampm === "pm" && hour < 12) {
    hour24 += 12;
  } else if (ampm === "am" && hour === 12) {
    hour24 = 0;
  }

  const newDate = new Date(year, month - 1, day, hour24, minutes, 0);

  return newDate;
}

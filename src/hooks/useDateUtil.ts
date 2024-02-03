import { useCallback } from "react";
import { format, parseISO, toDate } from "date-fns";
import { AmPmString } from "@/types/models/event";
import { toYMDStr as toYMDStrUtil } from "@/utils";

export const useDateUtil = () => {
  /**
   *
   *
   * @param {Date} date
   * @return {{ hour: number, minutes: number, ampm: AmPmString }}
   */
  const extract12HourFormat = useCallback((date: Date): { hour: number, minutes: number, ampm: AmPmString } => {
    let hour = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hour >= 12 ? "pm" : "am";
    hour = hour % 12 || 12;

    return { hour, minutes, ampm };
  }, []);

  /**
   * Date to yyyy-mm-dd
   *
   * @param {Date} date
   * @return {string}
   */
  const toYMDStr = useCallback(toYMDStrUtil, []);

  /**
   * Convert UTC string to formatted local date time string
   * ex) "2024-02-01T20:10:00.000Z" -> "Fri, 1st, Apr, 2024"
   *
   * @param {string} utcStr
   * @return {string} ex) Fri, 1st, Apr, 2024
   */
  const utcToOrdinalDate = useCallback((utcStr: string): string => {
    const localDate = toDate(parseISO(utcStr));
    return format(localDate, 'EEE, do, MMM, yyyy');
  }, []);

  return { extract12HourFormat, toYMDStr, utcToOrdinalDate };
};

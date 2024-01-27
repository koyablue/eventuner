"use client";

import { useState } from "react";
import { AmPmString } from "@/types/event";

type Props = {
  defaultHours?: number
  defaultMinutes?: number
  defaultAmPm?: AmPmString
  onChangeHandler: (hours: number, minutes: number, ampm: AmPmString) => void;
};

/**
 * Combined select box of hours, minutes, am/pm
 *
 * @return {JSX.Element}
 */
export const TimeSelect = ({
  defaultHours,
  defaultMinutes,
  defaultAmPm,
  onChangeHandler,
}: Props) => {
  // const [] = useState<{hour: number}>();

  const hourValues = Array.from({ length: 12 }, (_, i) => (i + 1));
  const minValues = Array.from({ length: 60 }, (_, i) => i);

  /**
   * Convert number to zero padded string
   *
   * @param {number} num
   * @return {string}
   */
  const toZeroPaddingStr = (num: number): string => num.toString().padStart(2, "0");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hour = e.target.name === "hour" ? parseInt(e.target.value) : defaultHours;
    const minutes = e.target.name === "minutes" ? parseInt(e.target.value) : defaultMinutes;
    const ampm = e.target.name === "ampm" ? e.target.value : defaultAmPm;

    onChangeHandler(Number(hour), Number(minutes), ampm as AmPmString);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="p-2 bg-white rounded-sm lg:rounded-md border">
        <div className="flex">
          <select
            name="hour"
            defaultValue={defaultHours || 0}
            onChange={handleChange}
            className="bg-transparent text-sm appearance-none outline-none hover:cursor-pointer"
          >
            {/* <option>--</option> */}
            {hourValues.map(hour =>
              <option key={hour} value={hour}>{toZeroPaddingStr(hour)}</option>
            )}
          </select>

          <span className="text-sm">:</span>

          <select
            name="minutes"
            defaultValue={defaultMinutes || 0}
            onChange={handleChange}
            className="bg-transparent text-sm appearance-none outline-none mr-2 hover:cursor-pointer"
          >
            {/* <option>--</option> */}
            {minValues.map(min =>
              <option key={min} value={min}>{toZeroPaddingStr(min)}</option>
            )}
          </select>

          <select
            name="ampm"
            defaultValue={defaultAmPm || "am"}
            onChange={handleChange}
            className="bg-transparent text-sm appearance-none outline-none hover:cursor-pointer"
          >
            <option value="am">am</option>
            <option value="pm">pm</option>
          </select>
        </div>
      </div>
    </div>
  );
};

"use client";

import { Fragment } from "react";
import { add } from "date-fns";
import { TimeSelect } from "../TimeSelect";
import { Icons } from "@/components/icnos";
import { ProposedScheduleLabel } from "./ProposedScheduleLabel";
import { extract12HourFormat } from "@/utils";
import { useEventDateStore, type TimeRange } from "@/stores/eventDateStore";

type Props = {
  date: Date
  timeRanges: TimeRange[],
  errors?: string[]
};

/**
 * Set of proposed date and time range(s)
 *
 * @param {Props} { date, timeRanges, errors }
 * @return {JSX.Element}
 */
export const ProposedSchedule = ({ date, timeRanges, errors }: Props) => {
  const {
    addTimeRangeToDate,
    removeTimeRangeAndDateIfEmpty,
  } = useEventDateStore();

  console.log("errors in ProposedSchedule:", errors);
  console.log("errors.length:", errors?.length);

  const addTimeRange = () => {
    const current = new Date();

    addTimeRangeToDate(
      date,
      {
        startAt: extract12HourFormat(current),
        endAt: extract12HourFormat(add(current, { hours: 1 })),
      }
    )
  };

  const removeTimeRange = (timeRangeId: string) => {
    const timeRangeToRemove = timeRanges.find(tr => tr.id === timeRangeId);
    if (!timeRangeToRemove) return;

    removeTimeRangeAndDateIfEmpty(date, timeRangeToRemove);
  };

  const {
    hour: defaultEndTimeHours,
    minutes: defaultEndTimeMinutes,
    ampm: defaultEndTimeAmPm,
  } = extract12HourFormat(add(date, { hours: 1 }));

  return (
    <div className="px-4 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <ProposedScheduleLabel date={date} />
        <button type="button" onClick={addTimeRange}>
          <Icons.plusCircle size={16} />
        </button>
      </div>
      {timeRanges.map((timeRange, i) =>
        <Fragment key={timeRange.id}>
          <div key={timeRange.id} className="w-full flex items-center gap-1 mb-3">
            <div className="flex items-center gap-2">
              <TimeSelect
                defaultHours={timeRange.startAt.hour}
                defaultMinutes={timeRange.startAt.minutes}
                defaultAmPm={timeRange.startAt.ampm}
              />
              -
              <TimeSelect
                defaultHours={timeRange.endAt?.hour || defaultEndTimeHours}
                defaultMinutes={timeRange.endAt?.minutes || defaultEndTimeMinutes}
                defaultAmPm={timeRange.endAt?.ampm || defaultEndTimeAmPm}
              />
            </div>
            <button onClick={() => removeTimeRange(timeRange.id)} className="flex-shrink-0">
              <Icons.x size={16} className="text-orange-600" />
            </button>
          </div>

          {errors?.length && errors[i]
            ? (
                <div className="flex items-center gap-2 text-orange-600 py-2">
                  <Icons.alertCircle size={18} />
                  <p>Invalid time range</p>
                </div>
              )
            : null
          }
        </Fragment>
      )}
    </div>
  );
};

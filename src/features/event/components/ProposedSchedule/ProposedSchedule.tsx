"use client";

import { Fragment } from "react";
import { add } from "date-fns";
import { TimeSelect } from "../TimeSelect";
import { Icons } from "@/components/icnos";
import { ProposedScheduleLabel } from "./ProposedScheduleLabel";
import { extract12HourFormat } from "@/utils";
import { useEventDateStore, isNewTimeRange, isExistingTimeRange, type TimeRange } from "@/stores/eventDateStore";
import { AmPmString } from "@/types/event";

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

  // Apply type guard for each items in the TimeRange array
  const typedTimeRanges = timeRanges.map(tr => {
    if (isExistingTimeRange(tr)) {
      return { ...tr, identifier: tr.id, isNew: false, isExisting: true };
    } else if (isNewTimeRange(tr)) {
      return { ...tr, identifier: tr.uuid, isNew: true, isExisting: false };
    }
    throw new Error("Unknown TimeRange type");
  });

  const {
    addTimeRangeToDate,
    updateTimeRange,
    removeTimeRangeAndDateIfEmpty,
  } = useEventDateStore();

  /**
   * Add time range in UI and store
   *
   */
  const handleAddTimeRange = () => {
    const current = new Date();

    addTimeRangeToDate(
      date,
      {
        startAt: extract12HourFormat(current),
        endAt: extract12HourFormat(add(current, { hours: 1 })),
      }
    )
  };

  /**
   * Remove time range from UI and store
   *
   * @param {(number | string)} timeRangeIdentifier
   */
  const handleRemoveTimeRange = (timeRangeIdentifier: number | string) => {
    const timeRangeToRemove = typedTimeRanges.find(tr =>
      (isExistingTimeRange(tr) && tr.id === timeRangeIdentifier) ||
      (isNewTimeRange(tr) && tr.uuid === timeRangeIdentifier)
    );

    if (!timeRangeToRemove) return;

    removeTimeRangeAndDateIfEmpty(date, timeRangeToRemove);
  };

  const {
    hour: defaultEndTimeHours,
    minutes: defaultEndTimeMinutes,
    ampm: defaultEndTimeAmPm,
  } = extract12HourFormat(add(date, { hours: 1 }));

  const handleOnChange = (
    timeRangeIdentifier: number | string,
    newHours: number,
    newMinutes: number,
    newAmPm: AmPmString,
    isStartAt: boolean,
  ) => {
    const timeRangeToUpdate = typedTimeRanges.find(tr => tr.identifier === timeRangeIdentifier);
    if (!timeRangeToUpdate) return;

    const updatedTimeRange = {
      ...timeRangeToUpdate,
      startAt: isStartAt
        ? { hour: newHours, minutes: newMinutes, ampm: newAmPm }
        : timeRangeToUpdate.startAt,
      endAt: isStartAt
        ? timeRangeToUpdate.endAt
        : { hour: newHours, minutes: newMinutes, ampm: newAmPm },
    };

    updateTimeRange(date, updatedTimeRange);
  };

  // TODO: updateTimeRange(by id)

  return (
    <div className="px-4 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <ProposedScheduleLabel date={date} />
        <button type="button" onClick={handleAddTimeRange}>
          <Icons.plusCircle size={16} />
        </button>
      </div>
      {typedTimeRanges.map((timeRange, i) =>
        <Fragment key={timeRange.identifier}>
          <div key={timeRange.identifier} className="w-full flex items-center gap-1 mb-3">
            <div className="flex items-center gap-2">
              <TimeSelect
                defaultHours={timeRange.startAt.hour}
                defaultMinutes={timeRange.startAt.minutes}
                defaultAmPm={timeRange.startAt.ampm}
                onChangeHandler={(hour, minutes, ampm) => handleOnChange(timeRange.identifier, hour, minutes, ampm, true)}
              />
              -
              <TimeSelect
                defaultHours={timeRange.endAt?.hour || defaultEndTimeHours}
                defaultMinutes={timeRange.endAt?.minutes || defaultEndTimeMinutes}
                defaultAmPm={timeRange.endAt?.ampm || defaultEndTimeAmPm}
                onChangeHandler={(hour, minutes, ampm) => handleOnChange(timeRange.identifier, hour, minutes, ampm, false)}
              />
            </div>
            <button onClick={() => handleRemoveTimeRange(timeRange.identifier)} className="flex-shrink-0">
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

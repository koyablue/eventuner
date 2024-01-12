'use client';

import { TimeSelect } from '../TimeSelect';
import { Icons } from '@/components/icnos';
import { ProposedScheduleLabel } from './ProposedScheduleLabel';
import { addHoursToDate, extract12HourFormat, toYMDStr } from '@/utils';
import { useScheduleStore, type TimeRange } from '@/stores/scheduleStore';

type Props = {
  date: Date
  timeRanges: TimeRange[],
};

/**
 * Set of proposed date and time range(s)
 *
 * @param {Props} { date, timeRanges }
 * @return {JSX.Element}
 */
export const ProposedSchedule = ({ date, timeRanges }: Props) => {
  const {
    scheduleDates,
    addTimeRangeToDate,
    removeTimeRangeFromDate,
    removeDate,
  } = useScheduleStore();

  const addTimeRange = () => {
    const current = new Date();

    addTimeRangeToDate(
      date,
      {
        start: extract12HourFormat(current),
        end: extract12HourFormat(addHoursToDate(current, 1)),
      }
    )
  };

  const removeTimeRange = (timeRangeId: string) => {
    const timeRangeToRemove = timeRanges.find(tr => tr.id === timeRangeId);
    if (!timeRangeToRemove) return;

    removeTimeRangeFromDate(date, timeRangeToRemove);

    if (!scheduleDates.find(sd => sd.date === toYMDStr(date))?.timeRanges.length) {
      removeDate(date);
    }
  };

  const {
    hours: defaultEndTimeHours,
    minutes: defaultEndTimeMinutes,
    ampm: defaultEndTimeAmPm,
  } = extract12HourFormat(addHoursToDate(date, 1));

  return (
    <div className='px-4 mb-6'>
      <div className='flex items-center gap-3 mb-3'>
        <ProposedScheduleLabel date={date} />
        <button type='button' onClick={addTimeRange}>
          <Icons.plusCircle size={16} />
        </button>
      </div>
      {timeRanges.map(timeRange =>
        <div key={timeRange.id} className='w-full flex items-center gap-1 mb-3'>
          <div className='flex items-center gap-2'>
            <TimeSelect
              defaultHours={timeRange.start.hours}
              defaultMinutes={timeRange.start.minutes}
              defaultAmPm={timeRange.start.ampm}
            />
            -
            <TimeSelect
              defaultHours={timeRange.end?.hours || defaultEndTimeHours}
              defaultMinutes={timeRange.end?.minutes || defaultEndTimeMinutes}
              defaultAmPm={timeRange.end?.ampm || defaultEndTimeAmPm}
            />
          </div>
          <button onClick={() => removeTimeRange(timeRange.id)} className='flex-shrink-0'>
            <Icons.x size={16} className='text-orange-600' />
          </button>
        </div>
      )}
    </div>
  );
};

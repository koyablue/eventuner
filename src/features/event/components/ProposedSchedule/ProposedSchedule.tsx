'use client';

import { add } from 'date-fns';
import { TimeSelect } from '../TimeSelect';
import { Icons } from '@/components/icnos';
import { ProposedScheduleLabel } from './ProposedScheduleLabel';
import { extract12HourFormat } from '@/utils';
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
    removeTimeRangeAndDateIfEmpty,
  } = useScheduleStore();

  console.log(timeRanges);

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
          <button onClick={() => removeTimeRange(timeRange.id)} className='flex-shrink-0'>
            <Icons.x size={16} className='text-orange-600' />
          </button>
        </div>
      )}
    </div>
  );
};

'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { TimeSelect } from './timeSelect';
import { Icons } from '@/components/icnos';
import { AmPmString } from '@/types/event';
import { addHoursToDate } from '@/utils';

type Props = {
  date: Date
  // TODO: time range(from and to. to is optional)
};

export const ProposedSchedule = ({ date }: Props) => {
  const getLabel = () => {
    const items = date.toDateString().split(' ');
    return `${items[1]} ${items[2]}`;
  };
  const label = date.toDateString()

  const [timeRangeCount, setTimeRangeCount] = useState<number>(1);

  const addTimeRange = () => {
    setTimeRangeCount(old => old + 1);
    // TODO: add element
  };

  const removeTimeRange = () => {
    setTimeRangeCount(old => old - 1);
    // TODO: remove element
  };

  const getTimeSelectValues = (date: Date): { hours: number, minutes: number, ampm: AmPmString } => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;

    return { hours, minutes, ampm };
  };

  const {
    hours: currentTimeHours,
    minutes: currentTimeMinutes,
    ampm: currentAmPm,
  } = getTimeSelectValues(new Date());

  const {
    hours: toTimeHours,
    minutes: toTimeMinutes,
    ampm: toAmPm,
  } = getTimeSelectValues(addHoursToDate(new Date(), 1));

  // d.toDateString().split(' ')[1]

  return (
    <div className='px-4'>
      <Label className='flex items-center gap-3 mb-1'>
        {getLabel()}
        <button onClick={addTimeRange}>
          <Icons.plusCircle size={16} />
        </button>
      </Label>
      <div className='w-full flex items-center gap-1 mb-3'>
        <div className='flex items-center gap-2'>
          <TimeSelect
            defaultHours={currentTimeHours}
            defaultMinutes={currentTimeMinutes}
            defaultAmPm={currentAmPm}
          />
          -
          <TimeSelect
            defaultHours={toTimeHours}
            defaultMinutes={toTimeMinutes}
            defaultAmPm={toAmPm}
          />
        </div>
        <button onClick={removeTimeRange} className='flex-shrink-0'>
          <Icons.x size={16} className='text-orange-600' />
        </button>
      </div>

      <div className='w-full flex items-center gap-1 mb-3'>
        <div className='flex items-center gap-2'>
          <TimeSelect
            defaultHours={currentTimeHours}
            defaultMinutes={currentTimeMinutes}
            defaultAmPm={currentAmPm}
          />
          -
          <TimeSelect
            defaultHours={toTimeHours}
            defaultMinutes={toTimeMinutes}
            defaultAmPm={toAmPm}
          />
        </div>
        <button onClick={removeTimeRange} className='flex-shrink-0'>
          <Icons.x size={16} className='text-orange-600' />
        </button>
      </div>

      {/* <div className='flex justify-end'>
        <button onClick={addTimeRange}>
          <Icons.plusCircle className='w-5' />
        </button>
      </div> */}
    </div>
  );
};

type Props = {
  daysCount: number
};

/**
 * TODO: pass calendar errors, add line break, add width
 *
 * @param {Props} { daysCount }
 * @return { JSX.Element }
 */
export const CalendarFooter = ({ daysCount }: Props) => {
  return daysCount > 0
    ? (<p className='text-sm'>You selected {daysCount} day{daysCount > 1 && 's'}.</p>)
    : (<p className='text-sm'>Please pick one or more days.</p>);
};

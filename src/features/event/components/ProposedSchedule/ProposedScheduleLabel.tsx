import { Label } from '@/components/ui/label';

type Props = {
  date: Date
};

/**
 * Month name and day
 * ex) June 06
 *
 * @param {Props} { date }
 * @return {JSX.Element}
 */
export const ProposedScheduleLabel = ({ date }: Props) => {
  const getLabel = () => {
    const items = date.toDateString().split(' ');
    return `${items[1]} ${items[2]}`;
  };

  return <Label>{getLabel()}</Label>;
};

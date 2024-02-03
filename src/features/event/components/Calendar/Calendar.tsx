import { Calendar as CalendarUi, type CalendarProps } from '@/components/ui/calendar';
import { CalendarFooter } from './CalendarFooter';

type CalendarPropsType = {
  selectedDays: Date[] | undefined
} & Omit<
  CalendarProps,
  | 'selected'
  | 'mode'
  | 'footer'
>

export const Calendar = (props: CalendarPropsType) => {
  return (
    <CalendarUi
      mode='multiple'
      selected={props.selectedDays}
      footer={<CalendarFooter daysCount={props?.selectedDays?.length || 0} />}
      {...props}
    />
  );
};

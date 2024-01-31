import { formatISO, format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { TimeRangeAttendanceSection } from "@/features/attendance/components/TimeRangeAttendanceSection";
import { EventDate, TimeRange } from "@/types/models/event";
import { useDateUtil } from "@/hooks/useDateUtil";

type Props = {
  eventDate: EventDate
};

/**
 *
 *
 * @param {Props} { date, timeRangesAttendees }
 * @return {JSX.Element}
 */
export const DateAttendanceSection = ({ eventDate }: Props) => {
  const { utcToOrdinalDate } = useDateUtil();

  // ex) Fri, 1st, Apr, 2024
  const date = utcToOrdinalDate(formatISO(eventDate.date));

  /**
   * Format startAt and endAt
   *
   * @param {TimeRange} timeRange
   * @return {string} ex) "09:30 am - 11:30 am"
   */
  const formatTimeRange = (timeRange: TimeRange): string => {
    const formattedStart = format(timeRange.startAt, 'hh:mm a');
    const formattedEnd = timeRange.endAt ? format(timeRange.endAt, 'hh:mm a') : ""

    return formattedEnd
      ? `${formattedStart} - ${formattedEnd}`
      : `${formattedStart} - `;
  };

  return (
    <Accordion type="single" collapsible className="flex flex-col gap-4 py-4">
      <AccordionItem value={date}>
        <AccordionTrigger className="text-xl font-semibold">{date}</AccordionTrigger>
        <AccordionContent>
          {
            eventDate.timeRanges.map(tr =>
              <TimeRangeAttendanceSection
                radioGroupName={`attendances[timeRangeId-${tr.id}]`}
                key={uuidv4()}
                timeRangeStr={formatTimeRange(tr)}
                attendances={tr.attendances}
              />
            )
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

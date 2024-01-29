import { v4 as uuidv4 } from "uuid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { TimeRangeAttendanceSection } from "@/features/attendance/component/TimeRangeAttendanceSection";

type Props = {
  date: string
  timeRangesAttendees: {
    timeRange: string
    attendees: {
      name: string
      status: number
    }[]
  }[]
};

/**
 *
 *
 * @param {Props} { date, timeRangesAttendees }
 * @return {JSX.Element}
 */
export const DateAttendanceSection = ({ date, timeRangesAttendees }: Props) => {
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-4 py-4">
      <AccordionItem value={date}>
        <AccordionTrigger className="text-xl font-semibold">{date}</AccordionTrigger>
        <AccordionContent>
          {
            timeRangesAttendees.map(v =>
              <TimeRangeAttendanceSection
                key={uuidv4()}
                timeRange={v.timeRange}
                attendees={v.attendees}
              />
            )
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

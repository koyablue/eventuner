'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';

// shadcn
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import { buttonVariants } from '@/components/ui/button';

// components
import { ProposedSchedule, CalendarFooter } from '@/features/event';

import { cn } from '@/lib/utils';
import { useDetectScrollToBottom } from '@/hooks/useDetectScrollToBottom';
import { NewEventSchema } from '@/features/api/event/validation/schemas';
import { addHoursToDate, extract12HourFormat, parseYMDStr } from '@/utils';

// stores
import { useScheduleStore, type TimeRange } from '@/stores/scheduleStore';

type EventFormData = z.infer<typeof NewEventSchema>;

export default function Home() {
  const { scheduleDates, addDate } = useScheduleStore();

  // Initially selected today in the calendar
  const initialDays: Date[] = [new Date()];
  // State for selected days in the calendar
  const [days, setDays] = useState<Date[] | undefined>(initialDays);

  // Indicates whether the proposed schedule section has been scrolled to the bottom
  const [isBottom, bottomRef] = useDetectScrollToBottom<HTMLDivElement>();

  /**
   * Create time range object of current time ~ current time + 1hour
   *
   * @return {Omit<TimeRange, 'id'>}
   */
  const createCurrentTimeRange = (): Omit<TimeRange, 'id'>  => {
    const current = new Date();
    return {
      start: extract12HourFormat(current),
      end: extract12HourFormat(addHoursToDate(current, 1)),
    };
  };

  /**
   * Update selectedDates and proposedSchedule
   *
   * @param {(Date[] | undefined)} days
   * @param {Date} selectedDay
   */
  const onCalendarDateSelectHandler = (days: Date[] | undefined, selectedDay: Date) => {
    setDays(days);
    addDate({ date: selectedDay, timeRanges: [createCurrentTimeRange()] })
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ''; // To show a confirmation dialogue
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Add proposed schedule initially (because today is initially selected in the calendar)
    addDate({ date: new Date(), timeRanges: [createCurrentTimeRange()] });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <main className='flex justify-center min-h-screen bg-slate-100 md:p-24'>
      <div className='w-full min-w-[320px] max-w-5xl min-h-[600px] bg-white px-8 rounded-md lg:px-4 lg:h-[calc(100vh-96px-96px)]'>
        <form className='h-full'>

          <div className='h-full w-full flex flex-col lg:flex-row'>
            {/* title and description */}
            <div className='w-full flex flex-row lg:border-r grow lg:flex-col lg:h-full lg:w-3/12'>
              <div className='w-full flex flex-col gap-8 pt-16 md:px-4'>
                <div>
                  <Label htmlFor='event_title_input'>Event name</Label>
                  <Input
                    id='event_title_input'
                    placeholder='Name your event'
                    className='focus-visible:ring-emerald-500 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:border-none' />
                </div>
                <div>
                  <Label htmlFor='event_detail_text_area'>Event details(optional)</Label>
                  <Textarea
                    id='event_detail_text_area'
                    placeholder='Write a summary and any details your invitee should know about the event.'
                    className='resize-none w-full h-40 lg:h-56 focus-visible:ring-emerald-500 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:border-none'
                  />
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className='pt-16 flex flex-col justify-center md:px-8 lg:w-5/12 lg:px-0 lg:pl-4 xl:px-4'>
              <Label htmlFor='event_date_picker' className='mb-2'>Select date(s)</Label>
              <Calendar
                id='event_date_picker'
                className="rounded-md w-full flex-1"
                mode='multiple'
                selected={days}
                onSelect={onCalendarDateSelectHandler}
                footer={<CalendarFooter daysCount={days?.length || 0} />}
                disabled={{ before: new Date() }}
                modifiersClassNames={{
                  selected: 'bg-emerald-500 text-white hover:bg-emerald-500 hover:text-white',
                  // today: 'bg-emerald-200'
                }}
                classNames={{
                  day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-foreground"
                  )
                }}
                fromYear={new Date().getFullYear()}
              />
            </div>

            {/* Days and time ranges */}
            <div className='grow w-full flex flex-col justify-between lg:w-3/12'>
              <div className='h-[80%] px-2.5 pt-10 overflow-hidden lg:pt-24'>
                <div className='h-full flex flex-col items-center overflow-auto lg:block lg:h-(calc(100%-96px))'>
                  {scheduleDates.map((sd, i, list) =>
                    i === list.length - 1
                      ? <div key={sd.date} ref={bottomRef}>
                          <ProposedSchedule
                            key={sd.date}
                            date={parseYMDStr(sd.date)}
                            timeRanges={sd.timeRanges}
                          />
                        </div>
                      : <ProposedSchedule
                          key={sd.date}
                          date={parseYMDStr(sd.date)}
                          timeRanges={sd.timeRanges}
                        />
                  )}
                </div>
              </div>
              {
                !isBottom && <div className='hidden w-full relative h-[150px] -mt-44 bg-gradient-to-t from-white to-transparent lg:-mt-48 lg:block'></div>
              }
              <div className='flex justify-end pb-6 md:pr-4'>
                <Button type='submit' className='bg-emerald-500 text-white hover:bg-emerald-600'>
                  Create an event
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

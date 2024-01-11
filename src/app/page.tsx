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
import { ProposedSchedule } from '@/features/event/components/proposedSchedule';

import { cn } from '@/lib/utils';
import { useDetectScrollToBottom } from '@/hooks/useDetectScrollToBottom';
import { NewEventSchema } from '@/features/api/event/validation/schemas';
import { addHoursToDate, extract12HourFormat } from '@/utils';

// stores
import { useScheduleStore } from '@/stores/scheduleStore';

type EventFormData = z.infer<typeof NewEventSchema>;

export default function Home() {
  const { scheduleDates, addDate, addTimeRangeToDate } = useScheduleStore();

  const initialDays: Date[] = [new Date()];
  const [days, setDays] = useState<Date[] | undefined>(initialDays);

  const calendarFooter = days && days.length > 0
    ? (<p className='text-sm'>You selected {days.length} day(s).</p>)
    : (<p className='text-sm'>Please pick one or more days.</p>);

  const [isBottom, bottomRef] = useDetectScrollToBottom<HTMLDivElement>();

  // TODO: declare onSelect function (add dates, addTimeRange)

  useEffect(() => {
    const today = new Date();
    const todayIsoString = today.toISOString();
    addDate({
      date: todayIsoString,
      timeRanges: [{
        start: extract12HourFormat(today),
        end: extract12HourFormat(addHoursToDate(today, 1)),
      }]
    });
  }, []);

  return (
    <main className='flex justify-center min-h-screen bg-slate-100 md:p-24'>
      <div className='w-full min-w-[320px] max-w-5xl min-h-[600px] bg-white px-8 rounded-md lg:px-4 lg:h-[calc(100vh-96px-96px)]'>
        <form className='h-full'>

          <div className='h-full w-full flex flex-col lg:flex-row'>
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

            <div className='pt-16 flex flex-col justify-center md:px-8 lg:w-5/12 lg:px-0 lg:pl-4 xl:px-4'>
              <Label htmlFor='event_date_picker' className='mb-2'>Select date(s)</Label>
              <Calendar
                id='event_date_picker'
                className="rounded-md w-full flex-1"
                mode='multiple'
                selected={days}
                onSelect={setDays}
                footer={calendarFooter}
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
              />
            </div>

            <div className='grow w-full flex flex-col justify-between lg:w-3/12'>
              <div className='h-[80%] px-2.5 pt-10 overflow-auto lg:pt-24'>
                <div className='h-full flex flex-col items-center lg:block'>
                  <ProposedSchedule date={new Date()} />
                  <ProposedSchedule date={new Date()} />
                  <ProposedSchedule date={new Date()} />
                  {/* last element */}
                  <div ref={bottomRef}>
                    <ProposedSchedule date={new Date()} />
                  </div>
                </div>
              </div>
              {
                !isBottom && <div className='hidden w-full relative h-[150px] -mt-44 bg-gradient-to-t from-white to-transparent lg:-mt-48 lg:block'></div>
              }
              <div className='flex justify-end pb-6 md:pr-4'>
                <Button className='bg-emerald-500 text-white hover:bg-emerald-600'>
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

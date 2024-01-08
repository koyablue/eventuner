'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import { TimeSelect } from '@/features/event/components/timeSelect';

import { Icons } from '@/components/icnos'

export default function Home() {
  const initialDays: Date[] = [new Date()];
  const [days, setDays] = useState<Date[] | undefined>(initialDays);

  const [date, setDate] = useState<Date | undefined>(new Date())

  const calendarFooter = days && days.length > 0
    ? (<p>You selected {days.length} day(s).</p>)
    : (<p>Please pick one or more days.</p>);

  return (
    <main className='flex justify-center min-h-screen bg-slate-100 p-24'>
      <div className='w-full max-w-5xl min-h-[600px] h-[calc(100vh-96px-96px)] bg-white px-4 rounded-md'>
        <form className='h-full'>

          <div className='h-full w-full flex'>
            <div className='w-4/12 h-full flex flex-col border-r'>
              <div className='flex flex-col gap-8 pt-16 px-4'>
                <div>
                  <Label htmlFor='event_title_input'>Event name</Label>
                  <Input id='event_title_input' placeholder='Name your event' />
                </div>
                <div>
                  <Label htmlFor='event_detail_text_area'>Event details(optional)</Label>
                  <Textarea
                    id='event_detail_text_area'
                    placeholder='Write a summary and any details your invitee should know about the event.'
                  />
                </div>
              </div>
            </div>

            <div className='w-5/12 px-4 pt-16 flex flex-col justify-center'>
              <Label htmlFor='event_date_picker' className='mb-2'>Select date(s)</Label>
              <Calendar
                id='event_date_picker'
                className="rounded-md p-4 w-full flex-1"
                mode='multiple'
                selected={days}
                onSelect={setDays}
                footer={calendarFooter}
                disabled={{ before: new Date() }}
              />
            </div>

            <div className='w-3/12 flex flex-col justify-between'>
              <div className='h-[80%] px-4 pt-24 overflow-auto'>
                <div>
                  <div>
                    <Label>Jan 7</Label>
                    <div className='flex items-center gap-2 mb-3'>
                      <TimeSelect /> - <TimeSelect />
                      <button type='button'>
                        <Icons.x className='w-4' />
                      </button>
                    </div>
                    <div className='flex items-center gap-2 mb-3'>
                      <TimeSelect /> - <TimeSelect />
                      <button type='button'>
                        <Icons.x className='w-4' />
                      </button>
                    </div>
                    <div className='flex justify-end'>
                      <Icons.plusCircle />
                    </div>
                  </div>

                  <div>
                    <Label>Jan 8</Label>
                    <div className='flex items-center gap-2 mb-3'>
                      <TimeSelect /> - <TimeSelect />
                      <button type='button'>
                        <Icons.x className='w-4' />
                      </button>
                    </div>
                    <div className='flex items-center gap-2 mb-3'>
                      <TimeSelect /> - <TimeSelect />
                      <button type='button'>
                        <Icons.x className='w-4' />
                      </button>
                    </div>
                    <div className='flex justify-end'>
                      <Icons.plusCircle />
                    </div>
                  </div>

                  <div>
                    <Label>Jan 9</Label>
                    <div className='flex items-center gap-2 mb-3'>
                      <TimeSelect /> - <TimeSelect />
                      <button type='button'>
                        <Icons.x className='w-4' />
                      </button>
                    </div>
                    <div className='flex items-center gap-2 mb-3'>
                      <TimeSelect /> - <TimeSelect />
                      <button type='button'>
                        <Icons.x className='w-4' />
                      </button>
                    </div>
                    <div className='flex justify-end'>
                      <Icons.plusCircle />
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex justify-end pb-6 pr-4'>
                <Button className='bg-[#5e9c76] text-white'>出欠表をつくる</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { z } from "zod";
import { DayModifiers } from "react-day-picker";
import { add, isSameDay, parseISO } from "date-fns";

// shadcn
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";

import {
  ProposedSchedule,
  Calendar,
  FormError,
  createEvent,
  useEventFormError,
} from "@/features/event";

import { cn } from "@/lib/utils";
import { useDetectScrollToBottom } from "@/hooks/useDetectScrollToBottom";
import { useBeforeUnload } from "@/hooks/useBeforeUnload";
import { extract12HourFormat } from "@/utils";

// stores
import { useEventDateStore, type TimeRange } from "@/stores/eventDateStore";
import { getApiEndpoint, getApiEndpointFull } from "@/routes/api";

export default function Home() {
  useBeforeUnload();

  const { eventDates, addDate, removeDate } = useEventDateStore();

  // Indicates whether the proposed schedule section has been scrolled to the bottom
  const [isBottom, bottomRef] = useDetectScrollToBottom<HTMLDivElement>();

  const { formErrors, setFormErrors, getFirstError, hasErrors, resetErrors } = useEventFormError();

  const customCreateEvent = createEvent.bind(null, eventDates)

  const extractScheduleErrors = (timeRangeCount: number) => {
    if (!formErrors?.eventDates?.length) return [];
    return formErrors.eventDates.splice(0, timeRangeCount);
  };

  const callCreateEventAction = async (formData: FormData) => {
    const res = await customCreateEvent(formData);

    const errors = res?.errors;
    if (errors) {
      // TODO: set state

      if (!eventDates.length) {
        errors.eventDates = ["Please select dates"]
      }
      setFormErrors(errors);
    }

    console.log(res)

    // TODO: clear inputs, global store, local states(errors) and switch to submit complete component
  }

  /**
   * Create time range object of current time ~ current time + 1hour
   *
   * @return {Omit<TimeRange, "id">}
   */
  const createCurrentTimeRange = (): Omit<TimeRange, "id">  => {
    const current = new Date();
    return {
      startAt: extract12HourFormat(current),
      endAt: extract12HourFormat(add(current, { hours: 1 })),
    };
  };

  /**
   * Action for when a date on Calendar is clicked
   *
   * @param {Date} clickedDate
   * @param {DayModifiers} { selected: wasSelected }
   */
  const onCalendarDateClicked = (clickedDate: Date, { selected: wasSelected }: DayModifiers) => {
    resetErrors("eventDates");

    wasSelected
      ? removeDate(clickedDate)
      : addDate({ date: clickedDate, timeRanges: [createCurrentTimeRange()] });
  };

  return (
    <main className="flex justify-center min-h-screen bg-slate-100 md:p-24">
      <div className="w-full min-w-[320px] max-w-5xl min-h-[600px] bg-white px-8 rounded-md shadow-md lg:px-4 lg:h-[calc(100vh-96px-96px)]">
        <form action={callCreateEventAction} className="h-full">
          <div className="h-full w-full flex flex-col lg:flex-row">
            {/* title and description */}
            <div className="w-full flex flex-row grow lg:flex-col lg:h-full lg:w-3/12">
              <div className="w-full flex flex-col gap-8 pt-16 md:px-4">
                <div>
                  <Label htmlFor="event_title_input">Event name</Label>
                  <Input
                    name="name"
                    id="event_title_input"
                    placeholder="Name your event"
                    // className={`${hasErrors("name") && 'border-orange-600'} focus-visible:ring-emerald-500 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:border-none`}
                    // className="focus-visible:ring-emerald-500 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:border-none"
                    className={`${hasErrors("name") && 'border-orange-600'} focus-visible:border-emerald-500 focus-visible:ring-0 focus-visible:ring-offset-0`}
                    onChange={() => resetErrors("name")}
                  />
                  <FormError message={getFirstError("name")} />
                </div>
                <div>
                  <Label htmlFor="event_description_text_area">Event description(optional)</Label>
                  <Textarea
                    name="description"
                    id="event_description_text_area"
                    placeholder="Write a summary and any details your invitee should know about the event."
                    className="resize-none w-full h-40 lg:h-56 focus-visible:border-emerald-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={() => resetErrors("description")}
                  />
                  <FormError message={getFirstError("description")} />
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="pt-16 flex flex-col justify-center md:px-8 lg:w-5/12 lg:px-0 lg:pl-4 xl:px-4">
              <Label htmlFor="event_date_picker" className="mb-2">Select date(s)</Label>
              <Calendar
                id="event_date_picker"
                className="rounded-md w-full flex-1"
                disabled={{ before: new Date() }}
                modifiersClassNames={{
                  selected: "bg-emerald-500 text-white hover:bg-emerald-500 hover:text-white",
                }}
                classNames={{
                  day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-foreground"
                  )
                }}
                fromYear={new Date().getFullYear()}
                onDayClick={onCalendarDateClicked}
              />
            </div>

            {/* Days and time ranges */}
            <div className="grow w-full flex flex-col justify-between lg:w-3/12">
              <div className="h-[80%] pt-10 overflow-hidden lg:pt-24 xl:px-2.5">
                <div className="h-full flex flex-col items-center overflow-auto lg:block lg:h-(calc(100%-96px))">
                  {!eventDates.length && (
                    <div className="flex flex-col items-center h-full pt-32 pb-32 lg:pb-0">
                      {formErrors?.eventDates?.length
                        ? <FormError message={getFirstError("eventDates")} />
                        : <p className="text-center text-muted-foreground">No dates has been selected.</p>
                      }
                    </div>
                  )}
                  {eventDates.map((sd, i, list) =>
                    i === list.length - 1
                      ? <div key={sd.date} ref={bottomRef}>
                          <ProposedSchedule
                            key={sd.date}
                            date={parseISO(sd.date)}
                            timeRanges={sd.timeRanges}
                            errors={extractScheduleErrors(sd.timeRanges.length)}
                          />
                        </div>
                      : <ProposedSchedule
                          key={sd.date}
                          date={parseISO(sd.date)}
                          timeRanges={sd.timeRanges}
                          errors={extractScheduleErrors(sd.timeRanges.length)}
                        />
                  )}
                </div>
              </div>
              {/* {
                !isBottom && <div className="hidden w-full relative h-[150px] -mt-44 bg-gradient-to-t from-white to-transparent lg:-mt-48 lg:block"></div>
              } */}
              <div className="flex justify-end pb-6 md:pr-4">
                <Button type="submit" className="bg-emerald-500 text-white hover:bg-emerald-600">
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

"use client";

import { useRef } from "react";
import { parseISO } from "date-fns";
import { DayClickEventHandler } from "react-day-picker";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button, buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "./SubmitButton";
import { Calendar } from "@/features/event/components/Calendar/Calendar";
import { FormError } from "@/components/form/FormError";
import { StepLabel } from "@/features/event/components/EventForm/StepLabel";
import { RequiredLabel } from "@/features/event/components/EventForm/RequiredLabel";
import { ProposedSchedule } from "@/features/event/components/ProposedSchedule/ProposedSchedule";
import { useEventFormError } from "@/features/event/hooks/useEventFormError";

import { type EventDate } from "@/stores/eventDateStore";
import { cn } from "@/lib/utils";
import { useDetectScrollToBottom } from "@/hooks/useDetectScrollToBottom";


type Props = {
  defaultEventName?: string
  defaultEventDescription?: string
  selectedDays?: Date[]
  eventDates: EventDate[]
  errors?: {
    name?: string
    description?: string
    eventDates?: string[]
  }
  onCalendarDayClicked: DayClickEventHandler
  submitAction:
    | ((formData: FormData) => Promise<void>)
    | ((formData: FormData) =>void)
};

/**
 * Event create/update form
 *
 * @param {Props} {
 *   defaultEventName,
 *   defaultEventDescription,
 *   selectedDays,
 *   eventDates,
 *   onCalendarDayClicked,
 *   submitAction
 * }
 * @return {JSX.Element}
 */
export const EventForm = ({
  defaultEventName,
  defaultEventDescription,
  selectedDays,
  eventDates,
  errors,
  onCalendarDayClicked,
  submitAction
}: Props) => {

  // Refs for form
  const eventNameRef = useRef<HTMLInputElement>(null);
  const eventDescriptionRef = useRef<HTMLTextAreaElement>(null);
  // Indicates whether the proposed schedule section has been scrolled to the bottom
  const [isBottom, bottomRef] = useDetectScrollToBottom<HTMLDivElement>();

  // Handle form errors
  const {
    formErrors,
    setFormErrors,
    getFirstError,
    hasErrors,
    resetErrors,
    extractEventDatesErrors,
  } = useEventFormError();

  return (
    <form action={submitAction} autoComplete="off" className="h-full">
      <div className="h-full w-full flex flex-col lg:flex-row">
        {/* title and description */}
        <div className="w-full flex flex-row grow lg:flex-col lg:h-full lg:w-3/12">
          <div className="w-full flex flex-col gap-8 pt-16 md:px-4">
            <div>
              <StepLabel step={1} className="mb-1" />
              <Label htmlFor="event_title_input">&nbsp;Event name<RequiredLabel /></Label>
              <Input
                name="name"
                defaultValue={defaultEventName}
                id="event_title_input"
                placeholder="Name your event"
                // className={`${hasErrors("name") && 'border-orange-600'} focus-visible:ring-emerald-500 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:border-none`}
                // className="focus-visible:ring-emerald-500 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:border-none"
                className={`${hasErrors("name") && 'border-orange-600'} focus-visible:border-emerald-500 focus-visible:ring-0 focus-visible:ring-offset-0`}
                onChange={() => resetErrors("name")}
                ref={eventNameRef}
              />
              <FormError message={errors?.name} />
            </div>
            <div>
              <Label htmlFor="event_description_text_area">Event description(optional)</Label>
              <Textarea
                name="description"
                defaultValue={defaultEventDescription}
                id="event_description_text_area"
                placeholder="Write a summary and any details your invitee should know about the event."
                className="resize-none w-full h-40 lg:h-56 focus-visible:border-emerald-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={() => resetErrors("description")}
                ref={eventDescriptionRef}
              />
              <FormError message={errors?.description} />
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="pt-16 flex flex-col justify-center md:px-8 lg:w-5/12 lg:px-0 lg:pl-4 xl:px-4">
          <Label htmlFor="event_date_picker" className="mb-2 mt-1">
            <StepLabel step={2} />&nbsp;Select date(s)<RequiredLabel />
          </Label>
          <Calendar
            id="event_date_picker"
            className="rounded-md w-full flex-1"
            selectedDays={selectedDays}
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
            onDayClick={onCalendarDayClicked}
          />
        </div>

        {/* Days and time ranges */}
        <div className="grow w-full flex flex-col justify-between lg:w-3/12">
          <div className="h-[80%] pt-10 overflow-hidden lg:pt-24 xl:px-2.5">
            <div className="h-full flex flex-col items-center overflow-auto lg:block lg:h-(calc(100%-96px))">
              {!eventDates.length && (
                <div className="flex flex-col items-center h-full pt-32 pb-32 lg:pb-0">
                  {formErrors?.eventDates?.length
                    ? <FormError message={errors?.eventDates && errors.eventDates.length ? errors.eventDates[0] : undefined} />
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
                        errors={extractEventDatesErrors(sd.timeRanges.length)}
                      />
                    </div>
                  : <ProposedSchedule
                      key={sd.date}
                      date={parseISO(sd.date)}
                      timeRanges={sd.timeRanges}
                      errors={extractEventDatesErrors(sd.timeRanges.length)}
                    />
              )}
            </div>
          </div>
          {/* {
            !isBottom && <div className="hidden w-full relative h-[150px] -mt-44 bg-gradient-to-t from-white to-transparent lg:-mt-48 lg:block"></div>
          } */}
          <div className="flex justify-end pb-6 md:pr-4">
            <SubmitButton />
          </div>
        </div>
      </div>
    </form>
  );
};

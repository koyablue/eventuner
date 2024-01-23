"use client";

import { useState, useRef } from "react";
import { DayModifiers } from "react-day-picker";
import { add, parseISO } from "date-fns";

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
  EventCreated,
  createEventAction,
  useEventFormError,
} from "@/features/event";

import { useDetectScrollToBottom } from "@/hooks/useDetectScrollToBottom";
import { useBeforeUnload } from "@/hooks/useBeforeUnload";

// stores
import { useEventDateStore, type TimeRange } from "@/stores/eventDateStore";

import { extract12HourFormat } from "@/utils";
import { cn } from "@/lib/utils";
import { showToast } from "@/lib/react-toastify";

/**
 * Event create page
 *
 * @return {JSX.Element}
 */
const NewEvent = () => {
  // Set beforeunload event handler
  useBeforeUnload();

  const { eventDates, addDate, removeDate, resetDates } = useEventDateStore();

  // true temporarily to implement EventCreated page
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [createdEventUuid, setCreatedEventUuid] = useState<string>("");

  // Indicates whether the proposed schedule section has been scrolled to the bottom
  const [isBottom, bottomRef] = useDetectScrollToBottom<HTMLDivElement>();

  // Refs for form
  const eventNameRef = useRef<HTMLInputElement>(null);
  const eventDescriptionRef = useRef<HTMLTextAreaElement>(null);

  // Handle form errors
  const {
    formErrors,
    setFormErrors,
    getFirstError,
    hasErrors,
    resetErrors,
    extractEventDatesErrors,
  } = useEventFormError();

  const createEvent = createEventAction.bind(null, eventDates);
  const callCreateEventAction = async (formData: FormData) => {
    try {
      const res = await createEvent(formData);

      // Display errors if there are any errors
      const errors = res?.errors;
      if (errors) {
        if (!eventDates.length) {
          errors.eventDates = ["Please select dates"]
        }
        setFormErrors(errors);
        return;
      }
      if (!res.data) throw new Error("Response data is undefined");

      setCreatedEventUuid(res.data.uuid);
      // Clear form values
      resetDates();
      if (eventNameRef.current) {
        eventNameRef.current.value = "";
      }
      if (eventDescriptionRef.current) {
        eventDescriptionRef.current.value = "";
      }
      setIsSubmitted(true); // Display URL share component
    } catch (error) {
      console.error(error);
      showToast("error", <p>Failed to create event</p>)
    }
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

  // TODO: Loading view
  // TODO: Separate form into another component

  return (
    <main className="flex justify-center min-h-screen bg-slate-100 md:p-24">
      <div className="w-full min-w-[320px] max-w-5xl min-h-[600px] bg-white px-8 rounded-md shadow-md lg:px-4 lg:h-[calc(100vh-96px-96px)]">

        {isSubmitted
          ? <EventCreated uuid={createdEventUuid} />
          : (<form action={callCreateEventAction} className="h-full">
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
                        ref={eventNameRef}
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
                        ref={eventDescriptionRef}
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
                    <Button type="submit" className="bg-emerald-500 text-white hover:bg-emerald-600">
                      Create an event
                    </Button>
                  </div>
                </div>
              </div>
            </form>)}
      </div>
    </main>
  )
}

export default NewEvent;

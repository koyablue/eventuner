import { Event } from "@/types/models/event";
import { NewEventFormValidatedData } from "../validation/validators";
import { getApiEndpointFull } from "@/routes/api";

/**
 * Call create event API
 *
 * @param {NewEventFormValidatedData} values
 * @return {Promise<Event>}
 */
export const createNewEventService = async (values: NewEventFormValidatedData): Promise<Event> => {
  try {
    const res = await fetch(
      getApiEndpointFull("createEvent"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to create event");
    }

    const resData = await res.json();
    return resData.data;
  } catch (error) {
    throw error;
  }
};

import { ApiHandlerResponse } from "@/types/api";
import { Event } from "@/types/models/event";
import { getApiEndpointFull } from "@/lib/routes/api";

/**
 *
 *
 * @param {string} uuid
 * @return {Promise<Event>}
 */
export const getEventByUuidService = async (uuid: string): Promise<Event> => {
  try {
    const res = await fetch(getApiEndpointFull("getEventDetail", { uuid }), { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to get event by uuid");
    }

    return (await res.json()).data;
  } catch (error) {
    throw error;
  }
};

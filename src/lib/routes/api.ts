import pathManager from "path-kanri";
import { getApiBaseUrl } from "@/utils/env";

const apiBaseUrl = getApiBaseUrl();

// API endpoint routing
const { getPath: getApiEndpoint, getFullPath: getApiEndpointFull } =
  pathManager({
      createEvent: "/events",
    }, apiBaseUrl);

export { getApiEndpoint, getApiEndpointFull };

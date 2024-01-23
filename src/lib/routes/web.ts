import pathManager from "path-kanri";
import { getAppBaseUrl } from "@/utils/env";

const appBaseUrl = getAppBaseUrl();

// Routing
const { getPath: getWebRoute, getFullPath: getWebRouteFull } =
  pathManager({
      eventDetail: "/event/u/{uuid}",
    }, appBaseUrl);

export { getWebRoute, getWebRouteFull };

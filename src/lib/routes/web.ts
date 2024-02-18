import pathManager from "path-kanri";
import { getAppBaseUrl } from "@/utils/env";

const appBaseUrl = getAppBaseUrl();

// Routing
const { getPath: getWebRoute, getFullPath: getWebRouteFull } =
  pathManager({
    home: "/",
    event: "/event",
    eventDetail: "/event/u/{uuid}",
    signIn: "/sign-in"
  }, appBaseUrl);

export { getWebRoute, getWebRouteFull };

import { videoHandler, videoSpec } from "./videos";

export const videosRoutes = [[videoSpec, videoHandler]] as const;

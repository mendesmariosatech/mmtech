import { videoHandler, videoSpec } from "./videos";

export const videosRoutes = [[videoSpec, videoHandler]] as const;

import { app } from "../../base/base-app";
import { authMiddleware } from "../middleware/authentication";

const videosRouter = app.openapi(videoSpec, videoHandler);

videosRouter.use("/api/videos/*", authMiddleware);

export { videosRouter };

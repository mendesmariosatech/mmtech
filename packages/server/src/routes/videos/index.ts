import { videoHandler, videoSpec } from "./videos";
import { app } from "../../base/base-app";

const videosRouter = app.openapi(videoSpec, videoHandler);

export { videosRouter };

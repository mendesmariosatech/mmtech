import { postVideoHandler, postVideoSpec } from "./postVideo";
import { app } from "../../base/base-app";
import { getAllVideosHandler, getAllVideoSpec } from "./getAllVideos";

const videosRouter = app
	.openapi(postVideoSpec, postVideoHandler)
	.openapi(getAllVideoSpec, getAllVideosHandler);

export { videosRouter };

import { postVideoHandler, postVideoSpec } from "./postVideo";
import { app } from "../../base/base-app";

const videosRouter = app.openapi(postVideoSpec, postVideoHandler);

export { videosRouter };

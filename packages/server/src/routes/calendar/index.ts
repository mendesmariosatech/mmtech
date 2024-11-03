import { app } from "../../base/base-app";
import { createEventHandler, createEventSpec } from "./postEvent";

const calendarRouter = app.openapi(createEventSpec, createEventHandler);

export { calendarRouter };

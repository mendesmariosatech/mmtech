import { app } from "../../base/base-app";
import { createEventHandler, createEventSpec } from "./create-event";

const calendarRouter = app.openapi(createEventSpec, createEventHandler);

export { calendarRouter };

import { app } from "../../base/base-app";
import { getEventHandler, getEventSpec } from "./get-event";
import { createEventHandler, createEventSpec } from "./postEvent";

const calendarRouter = app
	.openapi(createEventSpec, createEventHandler)
	.openapi(getEventSpec, getEventHandler);

export { calendarRouter };

import { app } from "../../base/base-app";
import { createEventHandler, createEventSpec } from "./postEvent";
import { getCalendarHandler, getCalendarSpec } from "./getCalendar";

const calendarRouter = app
	.openapi(createEventSpec, createEventHandler)
	.openapi(getCalendarSpec, getCalendarHandler);

export { calendarRouter };

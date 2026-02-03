import { app } from "../../base/base-app";
import { createEventSpec, createEventHandler } from "./postEvent";
import { getCalendarSpec, getCalendarHandler } from "./getCalendar";

const calendarRouter = app
	.openapi(createEventSpec, createEventHandler)
	.openapi(getCalendarSpec, getCalendarHandler);

export { calendarRouter };

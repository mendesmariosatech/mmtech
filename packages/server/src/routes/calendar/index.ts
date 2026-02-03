import { app } from "../../base/base-app";
import { createEventSpec, createEventHandler } from "./postEvent";
import { getCalendarSpec, getCalendarHandler } from "./getCalendar";
import { updateEventSpec, updateEventHandler } from "./updateEvent";
import { deleteEventSpec, deleteEventHandler } from "./deleteEvent";

const calendarRouter = app
	.openapi(createEventSpec, createEventHandler)
	.openapi(getCalendarSpec, getCalendarHandler)
	.openapi(updateEventSpec, updateEventHandler)
	.openapi(deleteEventSpec, deleteEventHandler);

export { calendarRouter };

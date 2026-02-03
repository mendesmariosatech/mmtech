import { app } from "../../base/base-app";
import { createEventSpec, createEventHandler } from "./postEvent";
import { getCalendarSpec, getCalendarHandler } from "./getCalendar";
import { updateEventSpec, updateEventHandler } from "./updateEvent";
import { deleteEventSpec, deleteEventHandler } from "./deleteEvent";
import { addAttendeeSpec, addAttendeeHandler } from "./addAttendee";
import { removeAttendeeSpec, removeAttendeeHandler } from "./removeAttendee";
import { getAttendeesSpec, getAttendeesHandler } from "./getAttendees";

const calendarRouter = app
	.openapi(createEventSpec, createEventHandler)
	.openapi(getCalendarSpec, getCalendarHandler)
	.openapi(updateEventSpec, updateEventHandler)
	.openapi(deleteEventSpec, deleteEventHandler)
	.openapi(addAttendeeSpec, addAttendeeHandler)
	.openapi(removeAttendeeSpec, removeAttendeeHandler)
	.openapi(getAttendeesSpec, getAttendeesHandler);

export { calendarRouter };

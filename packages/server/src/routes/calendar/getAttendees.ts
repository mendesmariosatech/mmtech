import { createRoute, z } from "@hono/zod-openapi";
import { authMiddleware } from "../middleware/authentication";
import { AttendeeTable } from "./dto/attendee.dto";
import { EventTable } from "./dto/event.dto";
import { env } from "hono/adapter";
import type { AppRouteHandler } from "../../base/type";
import { eq } from "drizzle-orm";
import { eventTable } from "../../drizzle/schema";

/**
 * Specification for retrieving all attendees for a calendar event
 * Requires authentication and ownership of the event
 */
export const getAttendeesSpec = createRoute({
	method: "get",
	path: "/calendar/events/:eventId/attendees",
	tags: ["events"],
	middleware: [authMiddleware],
	headers: {
		authorization: {
			description: "Bearer token",
			schema: {
				type: "string",
			},
		},
	},
	request: {
		params: z.object({
			eventId: z.string(),
		}),
	},
	responses: {
		200: {
			description: "Attendees Retrieved Successfully",
			content: {
				"application/json": {
					schema: z.array(
						z.object({
							id: z.string(),
							customerId: z.string(),
							eventId: z.string(),
							customer: z.object({
								id: z.string(),
								authId: z.string().nullable(),
							}),
						}),
					),
				},
			},
		},
		403: {
			description: "Not Authorized",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
		},
		404: {
			description: "Event not found",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
		},
		500: {
			description: "Internal Server Error",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
		},
	},
});

type GetAttendeesRoute = typeof getAttendeesSpec;

export const getAttendeesHandler: AppRouteHandler<GetAttendeesRoute> = async (
	c,
) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);
	const authId = c.get("authId");
	const clientId = c.get("clientId");
	const businessId = c.get("businessId");
	const { eventId } = c.req.valid("param");

	if (!businessId || !authId || !clientId) {
		return c.json({ error: "Not authorized" }, 403);
	}

	// Check if the event belongs to the user's business
	const Event = new EventTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	const existingEvent = await Event.getEventById(eventId);

	if (!existingEvent || existingEvent.businessId !== businessId) {
		return c.json({ error: "Event not found or not authorized" }, 404);
	}

	const Attendee = new AttendeeTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	const attendees = await Attendee.getAttendeesByEventId(eventId);

	// Transform the response to match the expected schema
	const formattedAttendees = attendees.map((item) => ({
		id: item.customer_attendee.id,
		customerId: item.customer_attendee.customerId,
		eventId: item.customer_attendee.eventId,
		customer: {
			id: item.customer.id,
			authId: item.customer.authId,
		},
	}));

	return c.json(formattedAttendees, 200);
};

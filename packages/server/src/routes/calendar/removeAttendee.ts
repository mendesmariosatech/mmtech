import { createRoute, z } from "@hono/zod-openapi";
import { authMiddleware } from "../middleware/authentication";
import { AttendeeTable } from "./dto/attendee.dto";
import { env } from "hono/adapter";
import type { AppRouteHandler } from "../../base/type";
import { eq, and } from "drizzle-orm";
import { eventTable, customerAttendeeTable } from "../../drizzle/schema";

/**
 * Specification for removing a customer from an event's attendees
 * Requires authentication and ownership of the event
 */
export const removeAttendeeSpec = createRoute({
	method: "delete",
	path: "/calendar/events/:eventId/attendees/:customerId",
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
			customerId: z.string(),
		}),
	},
	responses: {
		200: {
			description: "Attendee Removed Successfully",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
					}),
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
			description:
				"Event or Customer not found, or customer is not attending the event",
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

type RemoveAttendeeRoute = typeof removeAttendeeSpec;

export const removeAttendeeHandler: AppRouteHandler<
	RemoveAttendeeRoute
> = async (c) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);
	const authId = c.get("authId");
	const clientId = c.get("clientId");
	const businessId = c.get("businessId");
	const { eventId, customerId } = c.req.valid("param");

	if (!businessId || !authId || !clientId) {
		return c.json({ error: "Not authorized" }, 403);
	}

	// Check if the event belongs to the user's business
	const existingEventResult = await c.var.db
		.select()
		.from(eventTable)
		.where(eq(eventTable.id, eventId));
	const existingEvent = existingEventResult[0];

	if (!existingEvent || existingEvent.businessId !== businessId) {
		return c.json({ error: "Event not found or not authorized" }, 404);
	}

	const Attendee = new AttendeeTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	// Check if the customer is attending the event
	const isAttending = await Attendee.isCustomerAttendingEvent(
		customerId,
		eventId,
	);
	if (!isAttending) {
		return c.json({ error: "Customer is not attending this event" }, 404);
	}

	const removed = await Attendee.removeAttendee(customerId, eventId);

	if (!removed) {
		return c.json({ error: "Attendee not removed" }, 500);
	}

	return c.json({ message: "Attendee removed successfully" }, 200);
};

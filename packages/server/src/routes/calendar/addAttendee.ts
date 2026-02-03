import { createRoute, z } from "@hono/zod-openapi";
import { authMiddleware } from "../middleware/authentication";
import { AttendeeTable } from "./dto/attendee.dto";
import { env } from "hono/adapter";
import type { AppRouteHandler } from "../../base/type";
import { eq } from "drizzle-orm";
import { eventTable } from "../../drizzle/schema";

/**
 * Specification for adding a customer as an attendee to a calendar event
 * Requires authentication and ownership of the event
 */
export const addAttendeeSpec = createRoute({
	method: "post",
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
		body: {
			content: {
				"application/json": {
					/**
					 * Request body schema for adding an attendee to an event
					 * Includes the customer ID to add as attendee
					 */
					schema: z.object({
						customerId: z.string(),
					}),
				},
			},
		},
	},
	responses: {
		201: {
			description: "Attendee Added Successfully",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
						attendee: z.object({
							id: z.string(),
							customerId: z.string(),
							eventId: z.string(),
						}),
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
			description: "Event or Customer not found",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
		},
		409: {
			description: "Customer is already attending this event",
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

type AddAttendeeRoute = typeof addAttendeeSpec;

export const addAttendeeHandler: AppRouteHandler<AddAttendeeRoute> = async (
	c,
) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);
	const authId = c.get("authId");
	const clientId = c.get("clientId");
	const businessId = c.get("businessId");
	const { eventId } = c.req.valid("param");
	const { customerId } = c.req.valid("json");

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

	// Check if the customer is already attending the event
	const isAlreadyAttending = await Attendee.isCustomerAttendingEvent(
		customerId,
		eventId,
	);
	if (isAlreadyAttending) {
		return c.json({ error: "Customer is already attending this event" }, 409);
	}

	const newAttendee = await Attendee.addAttendee(customerId, eventId);

	if (!newAttendee) {
		return c.json({ error: "Attendee not added" }, 500);
	}

	return c.json(
		{
			message: "Attendee added successfully",
			attendee: {
				id: newAttendee.id,
				customerId: newAttendee.customerId,
				eventId: newAttendee.eventId,
			},
		},
		201,
	);
};

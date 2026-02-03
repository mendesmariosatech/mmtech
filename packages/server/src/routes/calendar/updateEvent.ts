import { createRoute, z } from "@hono/zod-openapi";
import { InsertEventSchema, SelectEventSchema } from "../../drizzle/schema";
import { authMiddleware } from "../middleware/authentication";
import { EventTable } from "./dto/event.dto";
import { env } from "hono/adapter";
import type { AppRouteHandler } from "../../base/type";
import { eq } from "drizzle-orm";
import { eventTable } from "../../drizzle/schema";

/**
 * Specification for updating an existing calendar event
 * Requires authentication and ownership of the event
 */
export const updateEventSpec = createRoute({
	method: "put",
	path: "/calendar/events/:eventId",
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
					 * Request body schema for updating a calendar event
					 * All fields are optional, allowing partial updates
					 */
					schema: InsertEventSchema.omit({
						clientId: true,
						businessId: true,
						addressId: true,
					}).partial(), // Allow partial updates
				},
			},
		},
	},
	responses: {
		200: {
			description: "Event Updated",
			content: {
				"application/json": {
					schema: SelectEventSchema,
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

type UpdateEventRoute = typeof updateEventSpec;

export const updateEventHandler: AppRouteHandler<UpdateEventRoute> = async (
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

	const validatedInput = c.req.valid("json");

	// Check if the event belongs to the user's business
	const Event = new EventTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	const existingEvent = await Event.getEventById(eventId);

	if (!existingEvent || existingEvent.businessId !== businessId) {
		return c.json({ error: "Event not found or not authorized" }, 404);
	}

	// Update the event with provided fields
	const updatedEvent = await Event.updateEvent(eventId, {
		...validatedInput,
		clientId: existingEvent.clientId,
		businessId: existingEvent.businessId,
		addressId: existingEvent.addressId,
	});

	if (!updatedEvent) {
		return c.json({ error: "Event not updated" }, 500);
	}

	return c.json(updatedEvent, 200);
};

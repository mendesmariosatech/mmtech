import { createRoute, z } from "@hono/zod-openapi";
import { authMiddleware } from "../middleware/authentication";
import { EventTable } from "./dto/event.dto";
import { env } from "hono/adapter";
import type { AppRouteHandler } from "../../base/type";

/**
 * Specification for deleting a calendar event
 * Requires authentication and ownership of the event
 */
export const deleteEventSpec = createRoute({
	method: "delete",
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
	},
	responses: {
		200: {
			description: "Event Deleted Successfully",
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

type DeleteEventRoute = typeof deleteEventSpec;

export const deleteEventHandler: AppRouteHandler<DeleteEventRoute> = async (
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

	const Event = new EventTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	const existingEvent = await Event.getEventById(eventId);

	if (!existingEvent) {
		return c.json({ error: "Event not found" }, 404);
	}

	if (existingEvent.businessId !== businessId) {
		return c.json({ error: "Not authorized" }, 403);
	}

	const deleted = await Event.deleteEvent(eventId);

	if (!deleted) {
		return c.json({ error: "Event not deleted" }, 500);
	}

	return c.json({ message: "Event deleted successfully" }, 200);
};

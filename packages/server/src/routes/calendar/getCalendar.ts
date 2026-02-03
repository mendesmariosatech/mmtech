import { createRoute, z } from "@hono/zod-openapi";
import { SelectEventSchema } from "../../drizzle/schema";
import { authMiddleware } from "../middleware/authentication";
import { EventTable } from "./dto/event.dto";
import { env } from "hono/adapter";
import type { AppRouteHandler } from "../../base/type";

/**
 * Specification for retrieving calendar events for a specific business
 * Requires authentication and proper business access rights
 */
export const getCalendarSpec = createRoute({
	method: "get",
	path: "/calendar/:businessId",
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
		/** Parameter schema to specify which business's calendar to retrieve */
		params: z.object({
			businessId: z.string(),
		}),
	},
	responses: {
		200: {
			description: "Calendar Events Retrieved",
			content: {
				"application/json": {
					/** Returns an array of events for the specified business */
					schema: z.array(SelectEventSchema),
				},
			},
		},
		401: {
			description: "Not Authorized",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
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
	},
});

type GetCalendarRoute = typeof getCalendarSpec;

export const getCalendarHandler: AppRouteHandler<GetCalendarRoute> = async (
	c,
) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);
	const authId = c.get("authId");
	const clientId = c.get("clientId");
	const businessId = c.get("businessId");
	const { businessId: requestedBusinessId } = c.req.valid("param");

	// Check if the user is trying to access their own business calendar
	if (!authId || !clientId || businessId !== requestedBusinessId) {
		return c.json({ error: "Not authorized" }, 403);
	}

	const Event = new EventTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	const events = await Event.getEventsByBusinessId(requestedBusinessId);

	return c.json(events, 200);
};

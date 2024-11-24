import { createRoute, z } from "@hono/zod-openapi";
import { InsertEventSchema, SelectEventSchema } from "../../drizzle/schema";
import { authMiddleware } from "../middleware/authentication";
import { EventTable } from "./event.dto";
import { env } from "hono/adapter";
import type { AppRouteHandler } from "../../base/type";
import { BusinessTable } from "../business/dto/business.dto";

export const createEventSpec = createRoute({
	method: "post",
	path: "/calendar/events",
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
		body: {
			content: {
				"application/json": {
					schema: InsertEventSchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: "Event Created",
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
		500: {
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

type CreateEventRoute = typeof createEventSpec;

export const createEventHandler: AppRouteHandler<CreateEventRoute> = async (
	c,
) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);
	const authId = c.get("authId");
	const clientId = c.get("clientId");
	const businessId = c.get("businessId");

	if (!businessId || !authId || !clientId) {
		return c.json({ error: "Not authorized" }, 403);
	}

	const input = c.req.valid("json");

	const Business = new BusinessTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	const business = await Business.findBusinessByClientId(clientId);

	if (!business) {
		return c.json({ error: "Not authorized, you don't have a business" }, 403);
	}

	const { title, date } = c.req.valid("json");

	// how to create a new event
	const Event = new EventTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	const newEvent = await Event.createEvent({
		title,
		date: Number(date),
		businessId: businessId,
		clientId: clientId,
	});

	if (!newEvent) {
		return c.json({ error: "Server Error: Event not created" }, 500);
	}

	return c.json(newEvent, 201);
};

import { createRoute, z } from "@hono/zod-openapi";
import { authMiddleware } from "../middleware/authentication";
import { SelectEventSchema } from "../../drizzle/schema";
import { AppRouteHandler } from "../../base/type";
import { EventTable } from "./event.dto";
import { env } from "hono/adapter";

const ParamsSchema = z.object({
	businessId: z.string(),
});

export const getEventSpec = createRoute({
	method: "get",
	path: "/calendar/events/business/{businessId}",
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
		query: ParamsSchema,
	},
	responses: {
		200: {
			description: "Event Created",
			content: {
				"application/json": {
					schema: SelectEventSchema.array(),
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

type GetEventResponse = typeof getEventSpec;

export const getEventHandler: AppRouteHandler<GetEventResponse> = async (c) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);
	const Event = new EventTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	const { businessId } = c.req.valid("query");

	console.log({
		businessId,
	});

	const events = await Event.getEvents();

	return c.json(events, 200);
};

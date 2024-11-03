import { createRoute, RouteHandler, z } from "@hono/zod-openapi";
import { InsertEventSchema, SelectEventSchema } from "../../drizzle/schema";
import { authMiddleware } from "../middleware/authentication";
import { EventTable } from "./event.dto";
import { ENV_TYPES } from "@repo/zod-types";
import { env } from "hono/adapter";
import { AppRouteHandler } from "../../base/type";

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
	},
});

type CreateEventRoute = typeof createEventSpec;

export const createEventHandler: AppRouteHandler<CreateEventRoute> = async (
	c,
) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);
	// if the person is not authenticated don't even reach here
	// if the person is not a business customer don't reach here
	const token = c.get("jwtPayload");
	const authId = c.get("authId");
	const clientId = c.get("clientId");
	const businessId = c.get("businessId");

	if (!businessId || !authId || !clientId) {
		return c.json({ error: "Not authorized" }, 403);
	}

	// get the business id from the token
	// get the client id from the token
	// get the auth id from the token

	// if no business return
	// if no client return

	// create the new event

	const { title, date } = c.req.valid("json");

	// how to create a new event
	const Event = new EventTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	console.log("CREATE EVENT");
	// const event = await Event.createEvent({
	// 	title,
	// 	date: 10000,
	// 	business_id: "businessId",
	// 	client_creator: "clientId",
	// });

	// console.log({
	// 	event
	// })

	return c.json(
		{
			id: "123",
			title,
			date,
		},
		201,
	);
};

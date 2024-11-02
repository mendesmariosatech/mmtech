import { createRoute, RouteHandler } from "@hono/zod-openapi";
import { InsertEventSchema, SelectEventSchema } from "../../drizzle/schema";
import { authMiddleware } from "../middleware/authentication";

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
		200: {
			description: "Event Created",
			content: {
				"application/json": {
					schema: SelectEventSchema,
				},
			},
		},
	},
});

type CreateEventRoute = typeof createEventSpec;

export const createEventHandler: RouteHandler<CreateEventRoute> = async (c) => {
	const body = c.req.valid("json");

	const { business_id, title, client_creator, date } = c.req.valid("json");

	// if the person is not authenticated don't even reach here

	return c.json({
		id: "123",
		title: body.title,
		date: body.date,
	});
};

import { customer } from "./../../drizzle/schema";
import { createRoute, RouteHandler } from "@hono/zod-openapi";
import { InsertEventSchema, SelectEventSchema } from "../../drizzle/schema";

export const createEventSpec = createRoute({
	method: "post",
	path: "/calendar/events",
	tags: ["events"],
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
	console.log(c.req.json());

	const { business_id, title, client_creator, date } = c.req.valid("json");

	console.log({
		business_id,
		client_creator,
		title,
		date,
	});

	return c.json({
		id: "123",
		title: "Event Title",
	});
};

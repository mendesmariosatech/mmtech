import { createRoute } from "@hono/zod-openapi";
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

// create an event endpoint

import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

export const createEventSpec = createRoute({
	method: "post",
	path: "/events",
	tags: ["events"],
	responses: {
		200: {
			description: "Event Created",
			content: {
				"application/json": {
					schema: z.object({
						id: z.string(),
						title: z.string(),
						description: z.string(),
						date: z.string(),
						startTime: z.string(),
						endTime: z.string(),
						location: z.string(),
						attendees: z.array(z.string()),
						createdAt: z.string(),
						updatedAt: z.string(),
					}),
				},
			},
		},
	},
});

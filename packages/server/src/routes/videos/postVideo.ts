import { createRoute, z } from "@hono/zod-openapi";
import { AppRouteHandler } from "../../base/type";
import { authMiddleware } from "../middleware/authentication";

const requestBody = z.object({
	message: z.string(),
});

const schema = z.object({
	message: z.string(),
});

export const postVideoSpec = createRoute({
	method: "post",
	path: "/videos",
	tags: ["videos"],
	middleware: [authMiddleware],
	request: {
		body: {
			content: {
				"application/json": {
					schema,
				},
			},
		},
	},
	responses: {
		200: {
			description: "Video Created",
			content: {
				"application/json": {
					schema,
				},
			},
		},
	},
});

type CreateVideoRoute = typeof postVideoSpec;

export const postVideoHandler: AppRouteHandler<CreateVideoRoute> = (c) => {
	const body = c.req.valid("json");
	console.log(body);
	console.log(body.message);
	const message = body.message;

	// create the table and the relationships
	// create the video
	// attach to a business and or a user

	return c.json({ message }, 200);
};

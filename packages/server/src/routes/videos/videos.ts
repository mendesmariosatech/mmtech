import { createRoute, RouteHandler, z } from "@hono/zod-openapi";

const requestBody = z.object({
	message: z.string(),
});

const schema = z.object({
	message: z.string(),
});

export const videoSpec = createRoute({
	method: "post",
	path: "/videos",
	tags: ["videos"],
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

type CreateVideoRoute = typeof videoSpec;

export const videoHandler: RouteHandler<CreateVideoRoute> = (c) => {
	const body = c.req.valid("json");
	console.log(body);
	console.log(body.message);
	const message = body.message;

	return c.json({ message }, 200);
};

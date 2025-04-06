import { createRoute, RouteHandler, z } from "@hono/zod-openapi";

const schema = z.object({
	message: z.string(),
});

export const videoSpec = createRoute({
	method: "post",
	path: "/videos",
	tags: ["videos"],
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
	return c.json({ message: "Hello from Hono!" }, 200);
};

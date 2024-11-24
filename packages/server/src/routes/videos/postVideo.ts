import { createRoute, z } from "@hono/zod-openapi";
import { AppRouteHandler } from "../../base/type";
import { authMiddleware } from "../middleware/authentication";
import { VideoTable } from "../../drizzle/videos/videos.dto";
import { selectedSchema } from "../../drizzle/videos/videos";

const schema = z.object({
	data: selectedSchema,
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
		400: {
			description: "Bad Request",
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

type CreateVideoRoute = typeof postVideoSpec;

export const postVideoHandler: AppRouteHandler<CreateVideoRoute> = async (
	c,
) => {
	const body = c.req.valid("json");
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = c.env;

	const businessId = c.get("businessId");

	if (!businessId) {
		return c.json({ error: "Business ID is required" }, 400);
	}

	const videoTable = new VideoTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	const newVideo = await videoTable.createVideo({
		businessId,
		url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
		title: "Gangnam Style",
		description: "The best video ever",
	});

	return c.json({ data: newVideo }, 200);
};

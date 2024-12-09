import { createRoute, z } from "@hono/zod-openapi";
import { AppRouteHandler } from "../../base/type";
import { authMiddleware } from "../middleware/authentication";
import { VideoTable } from "../../drizzle/videos/videos.dto";
import {
	CreateVideoFields,
	SelectVideoSchema,
} from "../../drizzle/videos/videos";
import { env } from "hono/adapter";

export const postVideoSpec = createRoute({
	method: "post",
	path: "/videos",
	tags: ["videos"],
	middleware: [authMiddleware],
	request: {
		body: {
			content: {
				"application/json": {
					schema: CreateVideoFields,
				},
			},
		},
	},
	responses: {
		200: {
			description: "Video Created",
			content: {
				"application/json": {
					schema: z.object({
						data: SelectVideoSchema,
					}),
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
		500: {
			description: "Internal Server Error",
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
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);

	const businessId = c.get("businessId");

	if (!businessId) {
		return c.json({ error: "Business ID is required" }, 400);
	}

	const videoTable = new VideoTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	const input = c.req.valid("json");

	const newVideo = await videoTable.createVideo({
		businessId,
		url: input.url,
		title: input.title,
		description: input.description,
	});

	if (!newVideo) {
		return c.json({ error: "Video not created" }, 500);
	}

	return c.json({ data: newVideo }, 200);
};

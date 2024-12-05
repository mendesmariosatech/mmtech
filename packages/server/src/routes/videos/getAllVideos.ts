import { createRoute, z } from "@hono/zod-openapi";
import { SelectVideoSchema } from "../../drizzle/videos/videos";
import { AppRouteHandler } from "../../base/type";
import { PaginationSchema } from "../../utils/pagination";
import { safeAwait } from "../../utils/safeAwait";

export const getAllVideoSpec = createRoute({
	method: "get",
	path: "/videos",
	tags: ["videos"],
	// middleware: [authMiddleware],
	request: {
		query: PaginationSchema,
		// body: {
		// 	content: {
		// 		"application/json": {
		// 			schema: CreateVideoFields,
		// 		},
		// 	},
		// },
	},
	responses: {
		200: {
			description: "Video Created",
			content: {
				"application/json": {
					schema: z.object({
						data: SelectVideoSchema.array(),
						pagination: z.object({
							total: z.number(),
							page: z.number(),
							limit: z.number(),
						}),
					}),
				},
			},
		},
		// 400: {
		// 	description: "Bad Request",
		// 	content: {
		// 		"application/json": {
		// 			schema: z.object({
		// 				error: z.string(),
		// 			}),
		// 		},
		// 	},
		// },
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

type GetAllVideosResponse = typeof getAllVideoSpec;

export const getAllVideosHandler: AppRouteHandler<
	GetAllVideosResponse
> = async (c) => {
	const { page, limit } = c.req.valid("query");

	const Video = c.get("dto").Videos;

	// safe await both queries
	const result = await safeAwait(
		Promise.all([
			Video.getAllPaginatedVideos({ page, limit }),
			Video.getVideosCounts(),
		]),
	);

	if (result.success === false || !result.data)
		return c.json({ error: "Error querying videos" }, 500);

	const [allVideos, count] = result.data;

	if (!allVideos) return c.json({ error: "Error querying videos" }, 500);
	if (!count) return c.json({ error: "Error querying videos" }, 500);

	return c.json(
		{
			data: allVideos,
			pagination: {
				total: count.count,
				page,
				limit,
			},
		},
		200,
	);
};

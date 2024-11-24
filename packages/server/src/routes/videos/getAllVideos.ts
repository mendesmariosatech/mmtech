import { createRoute, z } from "@hono/zod-openapi";
import { SelectVideoSchema } from "../../drizzle/videos/videos";
import { AppRouteHandler } from "../../base/type";
import { env } from "hono/adapter";
import { VideoTable } from "../../drizzle/videos/videos.dto";
import { PaginationSchema } from "../../utils/pagination";

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
		// 500: {
		// 	description: "Internal Server Error",
		// 	content: {
		// 		"application/json": {
		// 			schema: z.object({
		// 				error: z.string(),
		// 			}),
		// 		},
		// 	},
		// },
	},
});

type GetAllVideosResponse = typeof getAllVideoSpec;

export const getAllVideosHandler: AppRouteHandler<
	GetAllVideosResponse
> = async (c) => {
	const { TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN } = env(c);
	const { page, limit } = c.req.valid("query");

	const Video = new VideoTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	const videos = await Video.getAllPaginatedVideos({ page, limit });

	return c.json({
		data: videos,
		pagination: {
			total: 0,
			page,
			limit,
		},
	});
};

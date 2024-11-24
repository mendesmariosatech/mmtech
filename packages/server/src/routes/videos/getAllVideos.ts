import { createRoute, z } from "@hono/zod-openapi";
import { SelectVideoSchema } from "../../drizzle/videos/videos";
import { AppRouteHandler } from "../../base/type";

const PaginationSchema = z.object({
	page: z
		.string()
		.default("1")
		.refine((value) => !isNaN(Number(value)), {
			message: "Page must be a number",
		})
		.transform(Number),
	limit: z
		.string()
		.default("10")
		.refine((value) => !isNaN(Number(value)), {
			message: "Limit must be a number",
		})
		.transform(Number),
});

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
	const { page, limit } = c.req.valid("query");

	console.log({
		page,
		limit,
	});

	return c.json({
		data: [],
		pagination: {
			total: 0,
			page: 0,
			limit: 0,
		},
	});
};

// "currentPage": 1,
// "pageSize": 10,
// "totalItems": 25

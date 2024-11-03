// an spec for /business/

import { createRoute } from "@hono/zod-openapi";
import { CreateBusinessSchema, GetBusinessSchema } from "../../drizzle/schema";
import { AppRouteHandler } from "../../base/type";

export const createBusinessSpec = createRoute({
	method: "post",
	path: "/business",
	tags: ["business"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: CreateBusinessSchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: "Business Created",
			content: {
				"application/json": {
					schema: GetBusinessSchema,
				},
			},
		},
	},
});

type CreateBusinessRoute = typeof createBusinessSpec;

export const createBusinessHandler: AppRouteHandler<
	CreateBusinessRoute
> = async (c) => {
	return c.json(
		{
			name: "Business Name",
			id: "123456",
		},
		201,
	);
};

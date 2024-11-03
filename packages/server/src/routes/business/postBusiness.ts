// an spec for /business/

import { createRoute, z } from "@hono/zod-openapi";
import { CreateBusinessSchema, GetBusinessSchema } from "../../drizzle/schema";
import { AppRouteHandler } from "../../base/type";
import { BusinessTable } from "./dto/business.dto";
import { env } from "hono/adapter";
import { safeAwait } from "../../utils/safeAwait";

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

type CreateBusinessRoute = typeof createBusinessSpec;

export const createBusinessHandler: AppRouteHandler<
	CreateBusinessRoute
> = async (c) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);
	// create a new business in the database
	const Business = new BusinessTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	// go through middleware to validate the headers

	const body = c.req.valid("json");

	const [newBusiness, error] = await safeAwait(Business.createBusiness(body));

	if (error || !newBusiness) {
		console.log(error);
		return c.json({ error: "Failed to create business" }, 400);
	}

	return c.json(
		{
			...newBusiness,
			name: newBusiness.name,
			id: newBusiness.id,
		},
		201,
	);
};

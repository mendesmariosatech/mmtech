// an spec for /business/

import { createRoute, z } from "@hono/zod-openapi";
import { AppRouteHandler } from "../../base/type";
import { BusinessTable } from "../../drizzle/Business/business.dto";
import { env } from "hono/adapter";
import { safeAwait } from "../../utils/safeAwait";
import { authMiddleware } from "../middleware/authentication";
import { setCookie } from "hono/cookie";
import { COOKIES } from "../../env/cookies";
import { generateToken } from "../../jwt_token";
import {
	CreateBusinessInput,
	GetBusinessSchema,
} from "../../drizzle/Business/business";

export const createBusinessSpec = createRoute({
	method: "post",
	path: "/business",
	tags: ["business"],
	middleware: [authMiddleware],
	security: [
		{
			bearerAuth: ["business:write"],
		},
	],
	request: {
		body: {
			content: {
				"application/json": {
					schema: CreateBusinessInput,
				},
			},
		},
	},
	responses: {
		201: {
			description: "Business Created",
			content: {
				"application/json": {
					schema: z.object({
						data: GetBusinessSchema.extend({
							token: z.string(),
						}),
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
		403: {
			description: "Forbidden",
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
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL, JWT_SECRET_KEY } = env(c);
	const Business = new BusinessTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	const auth = c.get("authId");
	const client = c.get("clientId");
	const business = c.get("businessId");

	if (!auth || !client) {
		return c.json({ error: "Not Authorized" }, 403);
	}

	if (business) {
		return c.json({ error: "You already have a business" }, 403);
	}

	const body = c.req.valid("json");

	const newBusinessResult = await safeAwait(
		Business.createBusiness({
			name: body.name,
			clientId: client,
			description: body.description,
			slug: body.slug,
		}),
	);

	if (newBusinessResult.success === false || !newBusinessResult.data) {
		return c.json({ error: "Failed to create business" }, 400);
	}

	const token = await generateToken(
		{
			clientId: client,
			authId: auth,
			businessId: newBusinessResult.data.id,
		},
		JWT_SECRET_KEY,
	);

	// change the cookies, give a new token and refresh the frontend
	setCookie(c, COOKIES.USER_TOKEN, token);

	return c.json(
		{
			data: {
				name: newBusinessResult.data.name,
				id: newBusinessResult.data.id,
				token,
			},
		},
		201,
	);
};

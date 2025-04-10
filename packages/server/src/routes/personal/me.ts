import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";
import { AppRouteHandler } from "../../base/type";
import { authMiddleware } from "../middleware/authentication";

export const personalRoute = createRoute({
	method: "get",
	path: "/personal/me",
	tags: ["personal"],
	middleware: [authMiddleware],
	header: {
		authorization: z.string(),
	},
	responses: {
		200: {
			description: "Get personal data",
			content: {
				"application/json": {
					schema: z.object({
						data: z.object({
							clientId: z.string(),
							businessId: z.string().optional(),
							authId: z.string(),
						}),
					}),
				},
			},
		},
		404: {
			description: "Error",
			content: {
				"application/json": {
					schema: z.object({
						error: z.object({
							message: z.string(),
						}),
					}),
				},
			},
		},
	},
});

type PersonalRoute = typeof personalRoute;

export const personalHandler: AppRouteHandler<PersonalRoute> = async (c) => {
	// make sure the user is authenticated here
	console.log("personal handler");

	const clientId = c.get("clientId");
	const businessId = c.get("businessId");
	const authId = c.get("authId");

	return c.json(
		{
			data: {
				clientId,
				businessId,
				authId,
			},
		},
		200,
	);
};

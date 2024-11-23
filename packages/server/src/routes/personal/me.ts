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
							email: z.string(),
							password: z.string(),
							token: z.string(),
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
	return c.json(
		{
			data: {
				email: "Alex",
				password: "123456",
				token: "123456",
			},
		},
		200,
	);
};

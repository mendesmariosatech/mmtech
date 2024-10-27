import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { authMiddleware } from "../middleware/authentication";
import { createRoute, RouteHandler } from "@hono/zod-openapi";

export const personalRoute = createRoute({
	method: "get",
	path: "/personal/me",
	tags: ["personal"],
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

export const personalHandler: RouteHandler<PersonalRoute> = async (c) => {
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

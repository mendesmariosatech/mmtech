import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { env } from "hono/adapter";
import { ENV_TYPES } from "../../env/zod";
import { authMiddleware } from "../../middleware/authentication";

const queryValidation = zValidator(
	"query",
	z
		.object({
			email: z.string(),
			password: z.string(),
		})
		.optional(),
);

const headerValidation = zValidator(
	"header",
	z
		.object({
			Authorization: z.string(),
		})
		.optional(),
);

export const personalRoute = new Hono()
	.use("*", authMiddleware)
	.get("/me", queryValidation, headerValidation, async (c) => {
		const token = c.get("jwtPayload");
		const query = c.req.valid("query");

		if (!token) return c.json({ error: "Unauthorized" }, 401);

		if (query && query.email && query.password) {
			return c.json(
				{
					data: {
						email: query.email,
						password: query.password,
						token: token,
					},
				},
				201,
			);
		}

		return c.json(
			{
				error: {
					message: "Email and password are required",
				},
			},
			404,
		);
	});

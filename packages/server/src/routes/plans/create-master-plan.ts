import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";
import { AppRouteHandler } from "../../base/type";
import { authMiddleware } from "../middleware/authentication";

export const createMasterPlanSpec = createRoute({
	method: "post",
	path: "/master-plan",
	tags: ["plans"],
	// middleware: [authMiddleware],
	// header: { authorization: z.string(), },
	responses: {
		200: {
			description: "Get personal data",
			content: {
				"application/json": {
					schema: z.object({
						data: z.object({}),
					}),
				},
			},
		},
		403: {
			description: "Unauthorized",
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

type PersonalRoute = typeof createMasterPlanSpec;

export const createMasterPlanHandler: AppRouteHandler<PersonalRoute> = async (
	c,
) => {
	// make sure the user is authenticated here
	console.log("personal handler");

	const clientId = c.get("clientId");
	const businessId = c.get("businessId");
	const authId = c.get("authId");

	return c.json({ data: {} }, 200);
};

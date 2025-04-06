import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";
import { AppRouteHandler } from "../../base/type";
import { authMiddleware } from "../middleware/authentication";
import {
	GetSchemaPlanMaster,
	PlanMaster,
} from "../../drizzle/tasks/master-plan";
import { dbContext } from "../middleware/dbContext";

export const createMasterPlanSpec = createRoute({
	method: "post",
	path: "/master-plan",
	tags: ["plans"],
	middleware: [dbContext],
	// header: { authorization: z.string(), },
	request: {
		body: {
			content: {
				"application/json": {
					schema: PlanMaster,
				},
			},
		},
	},
	responses: {
		200: {
			description: "Get personal data",
			content: {
				"application/json": {
					schema: z.object({
						data: GetSchemaPlanMaster,
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
	const input = c.req.valid("json");

	console.log({
		input,
	});

	const Tasks = c.get("dto").Tasks;
	const masterTasks = await Tasks.createMasterTasks(input);

	console.log({
		masterTasks,
	});

	if (!masterTasks) {
		return c.json(
			{
				error: {
					message: "Failed to create master tasks",
				},
			},
			403,
		);
	}

	return c.json({ data: masterTasks }, 200);
};

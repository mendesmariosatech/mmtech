import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";
import { AppRouteHandler } from "../../base/type";
import { GetSchemaPlanMaster } from "../../drizzle/tasks/master-plan";
import { dbContext } from "../middleware/dbContext";

export const getMasterPlansSpec = createRoute({
	method: "get",
	path: "/master-plans",
	tags: ["plans"],
	middleware: [dbContext],
	responses: {
		200: {
			description: "Get all master plans",
			content: {
				"application/json": {
					schema: z.object({
						data: z.array(GetSchemaPlanMaster),
					}),
				},
			},
		},
		500: {
			description: "Server Error",
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

type GetMasterPlansRoute = typeof getMasterPlansSpec;

export const getMasterPlansHandler: AppRouteHandler<
	GetMasterPlansRoute
> = async (c) => {
	const Tasks = c.get("dto").Tasks;

	try {
		const masterPlans = await Tasks.getAllMasterPlans();
		return c.json({ data: masterPlans }, 200);
	} catch (error) {
		console.error("Error getting master plans:", error);
		return c.json(
			{
				error: {
					message: "Failed to retrieve master plans",
				},
			},
			500,
		);
	}
};

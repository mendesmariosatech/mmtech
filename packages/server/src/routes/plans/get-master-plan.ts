import { createRoute, z } from "@hono/zod-openapi";
import type { AppRouteHandler } from "../../base/type";
import { MasterPlanWithTasks } from "../../drizzle/tasks/master-plan";
import { dbContext } from "../middleware/dbContext";

export const getMasterPlanSpec = createRoute({
	method: "get",
	path: "/master-plan/:id",
	tags: ["plans"],
	middleware: [dbContext],
	request: {
		params: z.object({
			id: z.string().min(1).describe("The ID of the master plan"),
		}),
	},
	responses: {
		200: {
			description: "Detalhes do plano mestre com suas tarefas associadas",
			content: {
				"application/json": {
					schema: z.object({
						data: MasterPlanWithTasks,
					}),
				},
			},
		},
		404: {
			description: "Plano mestre não encontrado",
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
		500: {
			description: "Erro do servidor",
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

type GetMasterPlanRoute = typeof getMasterPlanSpec;

export const getMasterPlanHandler: AppRouteHandler<GetMasterPlanRoute> = async (
	c,
) => {
	const { id } = c.req.valid("param");
	const Tasks = c.get("dto").Tasks;

	try {
		const masterPlan = await Tasks.getMasterPlanById(id);

		if (!masterPlan) {
			return c.json(
				{
					error: {
						message: "Plano mestre não encontrado",
					},
				},
				404,
			);
		}

		return c.json({ data: masterPlan }, 200);
	} catch (error) {
		console.error("Error getting master plan details:", error);
		return c.json(
			{
				error: {
					message: "Falha ao buscar detalhes do plano mestre",
				},
			},
			500,
		);
	}
};

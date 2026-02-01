import { and, eq } from "drizzle-orm";
import type { DBConnectionFunc } from "../drizzle-client";
import { planMaster, planMasterTasks, type PlanMaster } from "./master-plan";

export const TasksDTO = (db: DBConnectionFunc) => ({
	async createMasterTasks(args: PlanMaster) {
		const [masterTasks] = await db.insert(planMaster).values(args).returning();

		return masterTasks;
	},

	async getAllMasterPlans() {
		const masterPlans = await db.select().from(planMaster);
		return masterPlans;
	},

	async getMasterPlanById(planMasterId: string) {
		// Using JOIN to improve performance by fetching plan and tasks in a single query
		const results = await db
			.select({
				plan: planMaster,
				tasks: planMasterTasks,
			})
			.from(planMaster)
			.leftJoin(
				planMasterTasks,
				eq(planMaster.planMasterId, planMasterTasks.planMasterId),
			)
			.where(eq(planMaster.planMasterId, planMasterId));

		if (results.length === 0) {
			return null;
		}

		// Transform the results into the appropriate structure
		const plan = results[0].plan;
		const tasks = results
			.filter(
				(
					result,
				): result is {
					plan: typeof planMaster.$inferSelect;
					tasks: typeof planMasterTasks.$inferSelect;
				} => result.tasks !== null,
			)
			.map((result) => result.tasks);

		return {
			...plan,
			tasks,
		};
	},
});

export type TasksDTO = ReturnType<typeof TasksDTO>;

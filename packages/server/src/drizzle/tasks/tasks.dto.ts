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
		const [plan] = await db
			.select()
			.from(planMaster)
			.where(eq(planMaster.planMasterId, planMasterId));

		if (!plan) {
			return null;
		}

		const tasks = await db
			.select()
			.from(planMasterTasks)
			.where(eq(planMasterTasks.planMasterId, planMasterId));

		return {
			...plan,
			tasks,
		};
	},
});

export type TasksDTO = ReturnType<typeof TasksDTO>;

import type { DBConnectionFunc } from "../drizzle-client";
import { planMaster, type PlanMaster } from "./master-plan";

export const TasksDTO = (db: DBConnectionFunc) => ({
	async createMasterTasks(args: PlanMaster) {
		const [masterTasks] = await db.insert(planMaster).values(args).returning();

		return masterTasks;
	},

	async getAllMasterPlans() {
		const masterPlans = await db.select().from(planMaster);
		return masterPlans;
	},
});

export type TasksDTO = ReturnType<typeof TasksDTO>;

import { DBConnectionFunc } from "../drizzle-client";
import { planMaster, type PlanMaster } from "./master-plan";

export const TasksDTO = (db: DBConnectionFunc) => ({
	async createMasterTasks(args: PlanMaster) {
		const [masterTasks] = await db.insert(planMaster).values(args).returning();

		return masterTasks;
	},
});

export type TasksDTO = ReturnType<typeof TasksDTO>;

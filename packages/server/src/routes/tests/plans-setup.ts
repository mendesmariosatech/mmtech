import { DBConnection } from "../../drizzle/drizzle-client";
import { planMaster, planMasterTasks } from "../../drizzle/tasks/master-plan";

const dbConnection = new DBConnection(
	process.env.TURSO_CONNECTION_URL,
	process.env.TURSO_AUTH_TOKEN,
);

export const PlansTestSetup = {
	async cleanupPlansData() {
		await dbConnection.db.delete(planMasterTasks);
		await dbConnection.db.delete(planMaster);
	},
};

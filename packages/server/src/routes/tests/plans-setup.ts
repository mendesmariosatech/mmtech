import { DBConnection } from "../../drizzle/drizzle-client";
import { planMaster, planMasterTasks } from "../../drizzle/tasks/master-plan";

// Use CJS exports for compatibility with Jest
const dbConnection = new DBConnection(
	process.env.TURSO_CONNECTION_URL,
	process.env.TURSO_AUTH_TOKEN,
);

export const PlansTestSetup = {
	async cleanupPlansData() {
		try {
			await dbConnection.db.delete(planMasterTasks);
			await dbConnection.db.delete(planMaster);
		} catch (error) {
			console.error("Error cleaning up plans data:", error);
		}
	},
};

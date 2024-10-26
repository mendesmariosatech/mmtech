import { ENV_VARIABLES } from "@repo/zod-types";
import { DBConnection } from "../../drizzle/drizzle-client";
import { authTable } from "../../drizzle/schema";

const dbConnection = new DBConnection(
	ENV_VARIABLES.TURSO_CONNECTION_URL,
	ENV_VARIABLES.TURSO_AUTH_TOKEN,
);

export const deleteDB = {
	async deleteTableAuth() {
		await dbConnection.db.delete(authTable);
	},
};

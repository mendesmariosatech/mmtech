import { DBConnection } from "../../drizzle/drizzle-client";
import { authTable } from "../../drizzle/schema";

const dbConnection = new DBConnection(
	process.env.TURSO_CONNECTION_URL,
	process.env.TURSO_AUTH_TOKEN,
);

type Cache = {
	USER_ID: string;
	USER_TOKEN: string;
};

type Keys = keyof Cache;

export const DBTestSetup = {
	userCache: new Map<Keys, string>(),
	async deleteTableAuth() {
		await dbConnection.db.delete(authTable);
	},
};

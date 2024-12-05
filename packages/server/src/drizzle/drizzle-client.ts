import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

export const createDrizzleClient = (
	TURSO_CONNECTION_URL: string,
	TURSO_AUTH_TOKEN: string,
) =>
	drizzle(
		createClient({
			url: TURSO_CONNECTION_URL,
			authToken: TURSO_AUTH_TOKEN,
		}),
		{
			schema,
		},
	);

export const dbConnection = (
	TURSO_CONNECTION_URL: string,
	TURSO_AUTH_TOKEN: string,
) => createDrizzleClient(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

export type DBConnectionFunc = ReturnType<typeof dbConnection>;

export type DB = ReturnType<typeof createDrizzleClient>;
export class DBConnection {
	db: DB;

	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		this.db = createDrizzleClient(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}
}

import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const createDrizzleClient = (
	TURSO_CONNECTION_URL: string,
	TURSO_AUTH_TOKEN: string,
) =>
	drizzle(
		createClient({
			url: TURSO_CONNECTION_URL,
			authToken: TURSO_AUTH_TOKEN,
		}),
	);

export class DBConnection {
	db: LibSQLDatabase<Record<string, never>>;

	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		this.db = createDrizzleClient(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}
}

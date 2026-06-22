import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "../../../packages/server/src/drizzle/schema";

const client = createClient({
	url: process.env.TURSO_CONNECTION_URL || "file:local.db",
	authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
export { schema };

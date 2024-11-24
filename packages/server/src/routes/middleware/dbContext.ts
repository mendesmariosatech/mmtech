import { env } from "hono/adapter";
import { createMiddleware } from "hono/factory";
import { DBConnection } from "../../drizzle/drizzle-client";
import { AppOpenAPI } from "../../base/type";

export const dbContext = createMiddleware<any, string, {}, AppOpenAPI>(
	async (c, next) => {
		const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);

		const db = new DBConnection(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

		c.set("db", db);
		await next();
	},
);

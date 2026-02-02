import { env } from "hono/adapter";
import { createMiddleware } from "hono/factory";
import { dbConnection, DBConnection } from "../../drizzle/drizzle-client";
import { AppOpenAPI } from "../../base/type";
import { VideoDTO } from "../../drizzle/videos/videos.dto";
import { TasksDTO } from "../../drizzle/tasks/tasks.dto";

export const dbContext = createMiddleware<any, string, {}, AppOpenAPI>(
	async (c, next) => {
		const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);

		// the function here will receive the env variables as an object
		// and will return all of the DTOs that are needed for the app
		const db = dbConnection(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

		console.log("DB", db);

		c.set("db", db);
		c.set("dto", {
			Videos: VideoDTO(db),
			Tasks: TasksDTO(db),
		});

		await next();
	},
);

import { ENV_VARIABLES } from "@repo/zod-types";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
	schema: "./src/drizzle/schema.ts",
	out: "./migrations",
	dialect: "sqlite",
	driver: "turso",
	dbCredentials: {
		url: ENV_VARIABLES.TURSO_CONNECTION_URL,
		authToken: ENV_VARIABLES.TURSO_AUTH_TOKEN,
	},
});

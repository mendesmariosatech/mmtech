import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

console.log({
	authToken: process.env.TURSO_AUTH_TOKEN,
	url: process.env.TURSO_CONNECTION_URL,
});

export default defineConfig({
	schema: "./src/drizzle/schema.ts",
	out: "./migrations",
	dialect: "sqlite",
	driver: "turso",
	dbCredentials: {
		url: process.env.TURSO_CONNECTION_URL,
		authToken: process.env.TURSO_AUTH_TOKEN,
	},
});

import { defineConfig } from "drizzle-kit";

console.log("TURSO_CONNECTION_URL:", process.env.TURSO_CONNECTION_URL);
console.log("TURSO_AUTH_TOKEN:", process.env.TURSO_AUTH_TOKEN);

export default defineConfig({
	schema: "./src/drizzle/schema.ts",
	out: "./migrations",
	dialect: "sqlite",
	driver: "turso",
	dbCredentials: {
		url: process.env.TURSO_CONNECTION_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!,
	},
});

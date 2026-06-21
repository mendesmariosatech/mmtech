import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/drizzle/schema.ts",
	out: "./migrations",
	dialect: "sqlite",
	driver: "turso",
	dbCredentials: {
		url: "file:./test.db",
	},
});

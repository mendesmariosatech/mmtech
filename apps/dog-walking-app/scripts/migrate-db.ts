import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "../lib/db";

async function migrateDatabase() {
	console.log("🚀 Running database migrations...");

	try {
		await migrate(db, {
			migrationsFolder:
				"/Users/alex/Desktop/development/pr-94-review/packages/server/migrations",
		});
		console.log("✅ Migrations completed successfully!");
	} catch (error) {
		console.error("❌ Error running migrations:", error);
		process.exit(1);
	}
}

if (require.main === module) {
	migrateDatabase();
}

export { migrateDatabase };

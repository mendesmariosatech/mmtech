import { createClient } from "@libsql/client";

async function pushSchema() {
	console.log("📤 Pushing schema to database...");

	try {
		// Create database client
		const client = createClient({
			url: process.env.TURSO_CONNECTION_URL || "file:local.db",
			authToken: process.env.TURSO_AUTH_TOKEN,
		});

		// Manual schema creation for dog walking tables
		await client.execute(`
			CREATE TABLE IF NOT EXISTS dog_walking_companies (
				id TEXT PRIMARY KEY,
				owner_id TEXT NOT NULL,
				name TEXT NOT NULL,
				created_at TEXT DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
				updated_at INTEGER,
				FOREIGN KEY (owner_id) REFERENCES auth (id) ON DELETE CASCADE
			);
		`);

		await client.execute(`
			CREATE TABLE IF NOT EXISTS dog_walking_employees (
				id TEXT PRIMARY KEY,
				user_id TEXT,
				name TEXT NOT NULL,
				email TEXT NOT NULL,
				phone TEXT,
				hourly_rate INTEGER NOT NULL,
				is_active INTEGER DEFAULT 1 NOT NULL,
				company_id TEXT NOT NULL,
				created_at TEXT DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
				updated_at INTEGER,
				FOREIGN KEY (user_id) REFERENCES auth (id) ON DELETE SET NULL,
				FOREIGN KEY (company_id) REFERENCES dog_walking_companies (id) ON DELETE CASCADE
			);
		`);

		await client.execute(`
			CREATE TABLE IF NOT EXISTS dog_walking_clients (
				id TEXT PRIMARY KEY,
				name TEXT NOT NULL,
				email TEXT,
				phone TEXT,
				address TEXT,
				dog_name TEXT NOT NULL,
				dog_breed TEXT,
				dog_notes TEXT,
				walk_rate INTEGER NOT NULL,
				is_active INTEGER DEFAULT 1 NOT NULL,
				company_id TEXT NOT NULL,
				created_at TEXT DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
				updated_at INTEGER,
				FOREIGN KEY (company_id) REFERENCES dog_walking_companies (id) ON DELETE CASCADE
			);
		`);

		await client.execute(`
			CREATE TABLE IF NOT EXISTS dog_walking_walks (
				id TEXT PRIMARY KEY,
				company_id TEXT NOT NULL,
				client_id TEXT NOT NULL,
				employee_id TEXT NOT NULL,
				started_at TEXT NOT NULL,
				ended_at TEXT,
				duration_minutes INTEGER,
				notes TEXT,
				status TEXT DEFAULT 'in_progress' NOT NULL,
				created_at TEXT DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
				updated_at INTEGER,
				FOREIGN KEY (company_id) REFERENCES dog_walking_companies (id) ON DELETE CASCADE,
				FOREIGN KEY (client_id) REFERENCES dog_walking_clients (id) ON DELETE CASCADE,
				FOREIGN KEY (employee_id) REFERENCES dog_walking_employees (id) ON DELETE CASCADE
			);
		`);

		await client.execute(`
			CREATE TABLE IF NOT EXISTS dog_walking_invoices (
				id TEXT PRIMARY KEY,
				company_id TEXT NOT NULL,
				client_id TEXT NOT NULL,
				invoice_number TEXT NOT NULL UNIQUE,
				period_start TEXT NOT NULL,
				period_end TEXT NOT NULL,
				total_walks INTEGER NOT NULL,
				total_amount INTEGER NOT NULL,
				status TEXT DEFAULT 'draft' NOT NULL,
				created_at TEXT DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
				updated_at INTEGER,
				FOREIGN KEY (company_id) REFERENCES dog_walking_companies (id) ON DELETE CASCADE,
				FOREIGN KEY (client_id) REFERENCES dog_walking_clients (id) ON DELETE CASCADE
			);
		`);

		console.log("✅ Schema pushed successfully!");
	} catch (error) {
		console.error("❌ Error pushing schema:", error);
		process.exit(1);
	}
}

if (require.main === module) {
	pushSchema();
}

export { pushSchema };

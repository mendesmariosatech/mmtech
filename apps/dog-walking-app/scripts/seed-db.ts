import { db, schema } from "../lib/db";

async function seedDatabase() {
	console.log("🌱 Seeding database with initial data...");

	try {
		// Create mock user in auth table first
		const user = await db
			.insert(schema.authTable)
			.values({
				id: "demo-user-id",
				name: "Demo Owner",
				email: "demo@example.com",
				password: "mock-password-hash",
			})
			.onConflictDoNothing()
			.returning();

		console.log("✅ Created user:", user[0]?.email || "Already exists");

		// Create mock employee user
		const employeeUser = await db
			.insert(schema.authTable)
			.values({
				id: "demo-employee-user-id",
				name: "Demo Employee",
				email: "employee@example.com",
				password: "mock-password-hash",
			})
			.onConflictDoNothing()
			.returning();

		console.log(
			"✅ Created employee user:",
			employeeUser[0]?.email || "Already exists",
		);

		// Create mock company
		const company = await db
			.insert(schema.dogWalkingCompanies)
			.values({
				id: "mock-company-id",
				name: "Demo Dog Walking Co",
				owner_id: "demo-user-id",
			})
			.onConflictDoNothing()
			.returning();

		console.log("✅ Created company:", company[0]?.name || "Already exists");

		// Create mock employee
		const employee = await db
			.insert(schema.dogWalkingEmployees)
			.values({
				id: "employee-1",
				name: "Jane Smith",
				email: "jane@example.com",
				phone: "555-0123",
				user_id: "demo-employee-user-id",
				hourly_rate: 2000, // $20.00 in cents
				company_id: "mock-company-id",
				is_active: true,
			})
			.onConflictDoNothing()
			.returning();

		console.log("✅ Created employee:", employee[0]?.name || "Already exists");

		// Create mock client
		const client = await db
			.insert(schema.dogWalkingClients)
			.values({
				id: "client-1",
				name: "John Doe",
				dog_name: "Buddy",
				phone: "555-0123",
				email: "john@example.com",
				address: "123 Main St",
				dog_notes: "Friendly golden retriever",
				walk_rate: 2500, // $25.00 in cents
				company_id: "mock-company-id",
				is_active: true,
			})
			.onConflictDoNothing()
			.returning();

		console.log("✅ Created client:", client[0]?.name || "Already exists");

		console.log("🎉 Database seeded successfully!");
	} catch (error) {
		console.error("❌ Error seeding database:", error);
		process.exit(1);
	}
}

if (require.main === module) {
	seedDatabase();
}

export { seedDatabase };

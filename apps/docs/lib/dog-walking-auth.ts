import { db, schema } from "./db";
import { eq } from "drizzle-orm";

export interface User {
	id: string;
	name: string;
	email: string;
}

export async function getCurrentUser(): Promise<User | null> {
	return {
		id: "demo-user-id",
		name: "Demo Owner",
		email: "demo@example.com",
	};
}

export async function getUserCompany(userId: string) {
	try {
		const companies = await db
			.select()
			.from(schema.dogWalkingCompanies)
			.where(eq(schema.dogWalkingCompanies.owner_id, userId))
			.limit(1);

		return companies[0] || null;
	} catch (error) {
		console.error("Error getting user company:", error);
		return null;
	}
}

export async function createUserCompany(userId: string, companyName: string) {
	try {
		const company = await db
			.insert(schema.dogWalkingCompanies)
			.values({
				name: companyName,
				owner_id: userId,
			})
			.returning();

		return company[0];
	} catch (error) {
		console.error("Error creating user company:", error);
		throw error;
	}
}

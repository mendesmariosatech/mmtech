// Simple authentication utilities for the dog-walking app
// This provides a basic auth system that works with our Drizzle setup

import { db, schema } from "./db";
import { eq } from "drizzle-orm";

export interface User {
	id: string;
	name: string;
	email: string;
}

// Mock authentication - in a real app this would check JWT tokens or sessions
export async function getCurrentUser(): Promise<User | null> {
	// For demo purposes, return the mock user we seeded
	// In a real app, this would decode JWT tokens or check sessions

	// Always return the demo user for now - this makes the demo work immediately
	return {
		id: "demo-user-id",
		name: "Demo Owner",
		email: "demo@example.com",
	};
}

export async function getUserCompany(userId: string) {
	try {
		console.log(`Getting company for user: ${userId}`);
		const companies = await db
			.select()
			.from(schema.dogWalkingCompanies)
			.where(eq(schema.dogWalkingCompanies.owner_id, userId))
			.limit(1);

		console.log(`Found ${companies.length} companies for user ${userId}`);
		return companies[0] || null;
	} catch (error) {
		console.error("Error getting user company:", error);
		return null;
	}
}

export async function createUserCompany(userId: string, companyName: string) {
	try {
		console.log(`Creating company "${companyName}" for user: ${userId}`);
		const company = await db
			.insert(schema.dogWalkingCompanies)
			.values({
				name: companyName,
				owner_id: userId,
			})
			.returning();

		console.log(`Created company: ${company[0]?.name}`);
		return company[0];
	} catch (error) {
		console.error("Error creating user company:", error);
		throw error;
	}
}

// Simple authentication for the dog-walking app demo
// This is a basic implementation for demonstration purposes

import { db, schema } from "./db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface AuthUser {
	id: string;
	name: string;
	email: string;
}

export async function createUser(
	name: string,
	email: string,
	password: string,
): Promise<AuthUser> {
	// Hash password
	const hashedPassword = await bcrypt.hash(password, 10);

	// Create user
	const user = await db
		.insert(schema.authTable)
		.values({
			name,
			email,
			password: hashedPassword,
		})
		.returning({
			id: schema.authTable.id,
			name: schema.authTable.name,
			email: schema.authTable.email,
		});

	return user[0];
}

export async function authenticateUser(
	email: string,
	password: string,
): Promise<AuthUser | null> {
	// Find user
	const users = await db
		.select({
			id: schema.authTable.id,
			name: schema.authTable.name,
			email: schema.authTable.email,
			password: schema.authTable.password,
		})
		.from(schema.authTable)
		.where(eq(schema.authTable.email, email))
		.limit(1);

	const user = users[0];
	if (!user) return null;

	// Check password
	const passwordMatch = await bcrypt.compare(password, user.password);
	if (!passwordMatch) return null;

	return {
		id: user.id,
		name: user.name,
		email: user.email,
	};
}

// Mock session management (in a real app, use proper session management)
let currentSession: AuthUser | null = null;

export function setCurrentUser(user: AuthUser) {
	currentSession = user;
}

export function getCurrentUser(): AuthUser | null {
	// Return mock user for demo - in real app this would check actual sessions
	return {
		id: "demo-user-id",
		name: "Demo Owner",
		email: "demo@example.com",
	};
}

export function clearCurrentUser() {
	currentSession = null;
}

// Simple local authentication using localStorage for demo purposes
// This removes database dependencies and provides immediate working auth

export interface User {
	id: string;
	name: string;
	email: string;
	companyName?: string;
}

// Mock users database (in a real app this would be in a secure backend)
const MOCK_USERS: Record<
	string,
	{
		id: string;
		name: string;
		email: string;
		password: string;
		companyName?: string;
	}
> = {
	"demo@example.com": {
		id: "demo-user-id",
		name: "Demo Owner",
		email: "demo@example.com",
		password: "password",
		companyName: "Demo Dog Walking Co",
	},
	"test@test.com": {
		id: "test-user-id",
		name: "Test User",
		email: "test@test.com",
		password: "password",
	},
};

export function authenticateUser(email: string, password: string): User | null {
	const user = MOCK_USERS[email.toLowerCase()];
	if (user && user.password === password) {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			companyName: user.companyName,
		};
	}
	return null;
}

export function createUser(
	name: string,
	email: string,
	password: string,
	companyName: string,
): User {
	const newUser = {
		id: `user-${Date.now()}`,
		name,
		email: email.toLowerCase(),
		password,
		companyName,
	};

	// In a real app, this would save to database
	MOCK_USERS[email.toLowerCase()] = newUser;

	return {
		id: newUser.id,
		name: newUser.name,
		email: newUser.email,
		companyName: newUser.companyName,
	};
}

export function setCurrentUser(user: User) {
	if (typeof window !== "undefined") {
		localStorage.setItem("current-user", JSON.stringify(user));
	}
}

export function getCurrentUser(): User | null {
	if (typeof window === "undefined") {
		// Server-side: return demo user for SSR
		return MOCK_USERS["demo@example.com"];
	}

	const stored = localStorage.getItem("current-user");
	return stored ? JSON.parse(stored) : null;
}

export function clearCurrentUser() {
	if (typeof window !== "undefined") {
		localStorage.removeItem("current-user");
	}
}

export function hasCompany(user: User): boolean {
	return !!user.companyName;
}

export function createCompany(user: User, companyName: string): User {
	const updatedUser = { ...user, companyName };

	// Update mock database
	if (MOCK_USERS[user.email]) {
		MOCK_USERS[user.email].companyName = companyName;
	}

	// Update current user
	setCurrentUser(updatedUser);

	return updatedUser;
}

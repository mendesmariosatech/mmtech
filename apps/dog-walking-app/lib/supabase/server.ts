// Mock Supabase server client for demo purposes
export async function createClient() {
	// During build time, return mock user to prevent redirect issues
	const isBuild =
		process.env.NODE_ENV === "production" ||
		process.env.NEXT_PHASE === "phase-production-build";

	return {
		auth: {
			getUser: async () => ({
				data: {
					user: isBuild
						? {
								id: "mock-user-id",
								email: "demo@example.com",
							}
						: null,
				},
				error: null,
			}),
			signOut: async () => ({ error: null }),
		},
		from: (table: string) => {
			const mockData = {
				companies: isBuild
					? [
							{
								id: "mock-company-id",
								name: "Demo Dog Walking Co",
								owner_id: "mock-user-id",
							},
						]
					: [],
				clients: isBuild
					? [
							{
								id: "client-1",
								name: "John Doe",
								dog_name: "Buddy",
								phone: "555-0123",
								email: "john@example.com",
								address: "123 Main St",
								dog_notes: "Friendly golden retriever",
								hourly_rate: 25,
								company_id: "mock-company-id",
								created_at: "2024-01-01T00:00:00Z",
							},
						]
					: [],
				employees: isBuild
					? [
							{
								id: "employee-1",
								name: "Jane Smith",
								email: "jane@example.com",
								hourly_rate: 20,
								company_id: "mock-company-id",
								created_at: "2024-01-01T00:00:00Z",
							},
						]
					: [],
				walks: isBuild ? [] : [],
				invoices: isBuild ? [] : [],
			};

			return {
				select: (columns?: string) => {
					const query = {
						eq: (column: string, value: any) => ({
							...query,
							single: () => ({
								data: mockData[table as keyof typeof mockData]?.[0] || null,
								error: null,
							}),
							order: () => ({
								...query,
								data: mockData[table as keyof typeof mockData] || [],
								error: null,
							}),
							data: mockData[table as keyof typeof mockData] || [],
							error: null,
						}),
						single: () => ({
							data: mockData[table as keyof typeof mockData]?.[0] || null,
							error: null,
						}),
						order: () => ({
							...query,
							data: mockData[table as keyof typeof mockData] || [],
							error: null,
						}),
						data: mockData[table as keyof typeof mockData] || [],
						error: null,
					};
					return query;
				},
				insert: () => ({ data: null, error: null }),
				update: () => ({ data: null, error: null }),
				delete: () => ({ data: null, error: null }),
			};
		},
	};
}

// Mock Supabase server client for demo purposes
export async function createClient() {
	return {
		auth: {
			getUser: async () => ({ data: { user: null }, error: null }),
			signOut: async () => ({ error: null }),
		},
		from: () => ({
			select: () => ({
				eq: () => ({ data: [], error: null }),
				single: () => ({ data: null, error: null }),
			}),
			insert: () => ({ data: null, error: null }),
			update: () => ({ data: null, error: null }),
			delete: () => ({ data: null, error: null }),
		}),
	};
}

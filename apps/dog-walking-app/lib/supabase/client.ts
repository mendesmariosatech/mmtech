// Mock Supabase client for demo purposes
export function createClient() {
	return {
		auth: {
			signUp: async () => ({ data: null, error: null }),
			signIn: async () => ({ data: null, error: null }),
			signOut: async () => ({ error: null }),
			getUser: async () => ({ data: { user: null }, error: null }),
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

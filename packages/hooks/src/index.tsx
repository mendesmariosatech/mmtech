"use client";
import type React from "react";
// In Next.js, this file would be called: app/providers.tsx

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
	isServer,
	QueryClient,
	QueryClientProvider,
	useMutation,
} from "@tanstack/react-query";
import { hono_client } from "./hono_client";
import type { RegisterFields } from "@repo/zod-types";
// import { getTodos, postTodo } from '../my-api'

// Create a client
const queryClient = new QueryClient();

export { QueryClientProvider, QueryClient };

// export function ReactQueryClientProvider({ children }: { children: React.ReactNode }) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       {children}
//     </QueryClientProvider>
//   )
// }

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 60 * 1000,
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient();
	} else {
		// Browser: make a new query client if we don't already have one
		// This is very important, so we don't re-make a new client if React
		// suspends during the initial render. This may not be needed if we
		// have a suspense boundary BELOW the creation of the query client
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}

export function QueryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	// NOTE: Avoid useState when initializing the query client if you don't
	//       have a suspense boundary between this and the code that may
	//       suspend because React will throw away the client on the initial
	//       render if it suspends and there is no boundary
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}

export function useRegister() {
	return useMutation({
		onError: (error) => {
			console.log(error.message);
		},
		onSuccess: (data) => {
			console.log(data);
		},

		mutationFn: (data: RegisterFields) => {
			console.log({
				data,
			})
			return hono_client.api.auth.register.$post({
				form: {
					email: data.email,
					password: data.password,
					name: data.name,
					phone: data.phone,
					agreeTerms: false.toString(),
				},
			});
		},
	});
}
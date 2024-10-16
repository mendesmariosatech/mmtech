import type { RegisterFields } from "@repo/zod-types";
import { useMutation } from "@tanstack/react-query";
import { hono_client } from "../hono_client";

export function useRegister() {
	return useMutation({
		onError: (error) => {},
		onSuccess: (data) => {},

		mutationFn: (data: RegisterFields) => {
			return hono_client.api.auth.register.$post({
				json: {
					email: data.email,
					password: data.password,
					name: data.name,
					phone: data.phone,
					agreeTerms: data.agreeTerms,
				},
			});
		},
	});
}

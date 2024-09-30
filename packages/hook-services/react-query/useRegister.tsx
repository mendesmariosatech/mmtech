import type { RegisterFields } from "@repo/zod-types";
import { useMutation } from "@tanstack/react-query";
import { hono_client } from "../hono_client";

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
			});
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

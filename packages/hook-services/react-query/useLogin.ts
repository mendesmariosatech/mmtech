import type { LoginFields } from "@repo/zod-types";
import { useMutation } from "@tanstack/react-query";
// import { hono_client } from "../hono_client";

export function useLogin() {
	return useMutation({
		onError: (error) => {
			console.log(error);
		},
		onSuccess: (data) => {
			console.log(data);
		},

		mutationFn: (data: LoginFields) => {
			console.log({ data });

			return Promise.resolve(data);
			// return hono_client.api.auth.register.$post({
			// 	json: {
			// 		email: data.email,
			// 		password: data.password,
			// 		name: data.name,
			// 		phone: data.phone,
			// 		agreeTerms: data.agreeTerms,
			// 	},
			// });
		},
	});
}

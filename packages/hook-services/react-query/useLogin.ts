import type { LoginFields } from "@repo/zod-types";
import { useMutation } from "@tanstack/react-query";
import { hono_client } from "../hono_client";
import { toast } from "sonner";

export function useLogin() {
	return useMutation({
		onError: (error) => {
			console.error(error.message);
			toast.error(error.message);
		},
		onSuccess: async (data) => {
			const resp = await data.json();
			console.log(resp);
			toast.success("Login successful");
		},

		mutationFn: (data: LoginFields) => {
			return hono_client.api.auth.login.$post({
				json: {
					email: data.email,
					password: data.password,
				},
			});
		},
	});
}

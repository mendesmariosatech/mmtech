import type { RegisterFields } from "@repo/zod-types";
import { useMutation } from "@tanstack/react-query";
import { hono_client } from "../hono_client";
import { toast } from "sonner";

export function useRegister() {
	return useMutation({
		onError: (error) => {
			// console.error(error.message);
			toast.error(error.message);
		},
		onSuccess: async (data) => {
			const resp = await data.json();

			if ("error" in resp) {
				toast.error(resp.error);
				return;
			}
			toast.success(
				`Hi, ${resp.data.auth.name}. Your Registration was successful`,
			);
		},

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

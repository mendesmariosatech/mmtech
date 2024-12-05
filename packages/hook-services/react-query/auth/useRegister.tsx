"use client";
import type { RegisterFields } from "@repo/zod-types";
import { useMutation } from "@tanstack/react-query";
import { hono_client } from "../../hono_client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Routes } from "@repo/data-testing/Routes";
export function useRegister() {
	const router = useRouter();

	return useMutation({
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: async (data) => {
			const resp = await data.json();

			if ("error" in resp) {
				toast.error(resp.error);
				return;
			}
			toast.success(
				`Hi, ${resp.data.auth.name}. Your Registration was successful! 🎉`,
			);

			router.push(Routes.client["/client/dashboard"]);
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

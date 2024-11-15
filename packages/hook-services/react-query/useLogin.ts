"use client";
import type { LoginFields } from "@repo/zod-types";
import { useMutation } from "@tanstack/react-query";
import { hono_client } from "../hono_client";
import { toast } from "sonner";
import { Routes } from "@repo/data-testing/Routes";
import { useRouter } from "next/navigation";

export function useLogin() {
	const router = useRouter();
	return useMutation({
		onSettled: () => {},
		onError: (error) => {
			toast.error("Server could not be reached");
		},
		onSuccess: async (data) => {
			const resp = await data.json();

			if ("error" in resp) {
				toast.error(`Expected Error: ${resp.error}`, {
					position: "top-right",
				});
				return;
			}
			toast.success(`Hi, ${resp.data.name}. Welcome back!`);
			router.push(Routes.client["/client/dashboard"]);
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

"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { hono_client } from "../../hono_client";
import type { CreateBusinessInput } from "@repo/server/business";

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
			toast.success(`Business Created: ${resp.data.name}`);
		},

		mutationFn: (data: CreateBusinessInput) => {
			return hono_client.api.business.$post({
				json: {
					name: data.name,
					description: data.description,
					slug: data.slug,
				},
			});
		},
	});
}

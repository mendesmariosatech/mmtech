"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { hono_client } from "../../hono_client";
import type { CreateBusinessInput } from "@repo/server/business";
import { ClientProps } from "../../context";

export function useCreateBusiness(auth: ClientProps | null) {
	return useMutation({
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

			// validate something that trigger the modal
		},

		mutationFn: (data: CreateBusinessInput) => {
			if (!auth?.token) {
				throw new Error("No Auth provided");
			}

			return hono_client.api.business.$post(
				{
					json: {
						name: data.name,
						description: data.description,
						slug: data.slug,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${auth.token}`,
					},
				},
			);
		},
	});
}

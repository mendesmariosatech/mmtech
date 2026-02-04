import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { hono_client } from "../../hono_client";
import { toast } from "sonner";
import { CreateBusinessInput } from "@repo/server/src/drizzle/schema";
import { z } from "zod";

type CreateBusinessResponse = {
	id: string;
	name: string;
	token: string;
};

export const useCreateBusiness = (
	options?: UseMutationOptions<
		CreateBusinessResponse,
		Error,
		z.infer<typeof CreateBusinessInput>
	>,
) => {
	return useMutation<
		CreateBusinessResponse,
		Error,
		z.infer<typeof CreateBusinessInput>
	>({
		mutationFn: async (variables) => {
			const response = await hono_client.api.business.$post({
				json: {
					name: variables.name,
					description: variables.description,
				},
			});

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ error: "Unknown error" }));
				throw new Error(errorData.error || "Failed to create business");
			}

			return response.json();
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
		...options,
	});
};

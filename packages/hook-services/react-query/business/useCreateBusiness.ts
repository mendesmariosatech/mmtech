import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { hono_client } from "../../hono_client";

// Define the same schema as in the backend to ensure type consistency
// Based on CreateBusinessInput from @repo/server/src/drizzle/schema
const CreateBusinessInput = z.object({
	name: z.string(),
	description: z.string().optional(),
});

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

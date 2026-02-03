import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { client } from "../../hono_client";

type CreateBusinessVariables = {
	name: string;
	description?: string;
};

type CreateBusinessResponse = {
	id: string;
	name: string;
	description?: string;
	clientId: string;
	createdAt: string;
	updatedAt: string;
};

export const useCreateBusiness = (
	options?: UseMutationOptions<
		CreateBusinessResponse,
		Error,
		CreateBusinessVariables
	>,
) => {
	return useMutation<CreateBusinessResponse, Error, CreateBusinessVariables>({
		mutationFn: async (variables) => {
			const response = await client.api.business.$post({
				json: {
					name: variables.name,
					description: variables.description,
				},
			});

			if (!response.ok) {
				const error = await response
					.json()
					.catch(() => ({ error: "Unknown error" }));
				throw new Error(error.message || "Failed to create business");
			}

			return response.json();
		},
		...options,
	});
};

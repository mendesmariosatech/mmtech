import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { hono_client } from "../../hono_client";
import { toast } from "sonner";

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
		mutationFn: (variables) => {
			return hono_client.api.business.$post({
				json: {
					name: variables.name,
					description: variables.description,
				},
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
		...options,
	});
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { hono_client } from "../../hono_client";
import { toast } from "sonner";
export const useLogout = () => {
	// invalidate query client
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: () => {
			return hono_client.api.auth.logout.$delete();
		},
		onError: (error) => {
			toast.error("Server could not be reached");
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
	});

	return mutation;
};

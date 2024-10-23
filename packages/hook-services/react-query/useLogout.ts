import { useMutation, useQueryClient } from "@tanstack/react-query";
import { hono_client } from "../hono_client";
export const useLogout = () => {
	// invalidate query client
	const queryClient = useQueryClient();
	const { mutate, ...rest } = useMutation({
		mutationFn: () => {
			return hono_client.api.auth.logout.$delete();
		},
		onError: (error) => {
			console.log("Server could not be reached: ", error.message);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
	});

	return {
		mutate,
		...rest,
	};
};

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { client } from "../../hono_client";

type Business = {
	id: string;
	name: string;
	description?: string;
	clientId: string;
	createdAt: string;
	updatedAt: string;
};

export const useGetBusiness = (
	businessId: string,
	options?: UseQueryOptions<Business, Error>,
) => {
	return useQuery<Business, Error>({
		queryKey: ["business", businessId],
		queryFn: async () => {
			const response = await client.api.business[":businessId"].$get({
				param: { businessId },
			});

			if (!response.ok) {
				const error = await response
					.json()
					.catch(() => ({ error: "Unknown error" }));
				throw new Error(error.message || "Failed to fetch business");
			}

			return response.json();
		},
		...options,
	});
};

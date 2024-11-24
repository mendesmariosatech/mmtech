import { useQuery } from "@tanstack/react-query";
import { hono_client } from "../hono_client";

export const useGetAllVideos = () => {
	return useQuery({
		queryKey: [hono_client.api.videos.$get.name],
		queryFn: async () => {
			const resp = await hono_client.api.videos.$get({
				query: {
					page: "1",
					limit: "10",
				},
			});

			if (resp.status !== 200) {
				const error = await resp.json();
				throw new Error(error.error);
			}

			const data = await resp.json();

			return data;
		},
	});
};

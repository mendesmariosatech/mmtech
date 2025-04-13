import { useQuery } from "@tanstack/react-query";
import { hono_client } from "../hono_client";

export const useGetAllVideos = () => {
	const routeKey = hono_client.api.videos.$url();
	console.log({ routeKey: routeKey.pathname });
	return useQuery({
		queryKey: [routeKey.pathname],
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

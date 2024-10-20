import type { LoginFields } from "@repo/zod-types";
import { useMutation } from "@tanstack/react-query";
import { hono_client } from "../hono_client";
import { toast } from "sonner";

export function useLogin() {
	return useMutation({
		onSettled: () => {
			console.log("settles");
		},
		onError: (error) => {
			// console.log("Server could not be reached: ", error.message);
			toast.error("Server could not be reached");
		},
		onSuccess: async (data) => {
			const resp = await data.json();

			if ("error" in resp) {
				toast.error(`Expected Error: ${resp.error}`);
				return;
			}
			console.log("Success Message:", resp.data.name);
			toast.success("Login successful");
		},

		mutationFn: (data: LoginFields) => {
			return hono_client.api.auth.login.$post({
				json: {
					email: data.email,
					password: data.password,
				},
			});
		},
	});
}

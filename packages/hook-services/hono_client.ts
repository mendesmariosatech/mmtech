import { hc } from "hono/client";
import type { AppType } from "@repo/server";
import { getBaseUrl } from "./getUrl";

export const hono_client = hc<AppType>(
	(() => {
		try {
			return getBaseUrl();
		} catch (error) {
			console.error("Erro ao obter URL base:", error);
			return process.env.FALLBACK_API_URL || "http://localhost:3000";
		}
	})(),
);

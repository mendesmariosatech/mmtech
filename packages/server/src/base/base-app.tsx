import { OpenAPIHono } from "@hono/zod-openapi";
import { ENV_TYPES } from "@repo/zod-types";
import { AppOpenAPI } from "./type";

type Variables = {
	authId: string;
	clientId: string;
	businessId?: string;
};

// type Variables = JwtVariables
// Compatible with the Next.JS 14 API routes
export const base_api_path = "/api";

export const app = new OpenAPIHono<AppOpenAPI>({
	strict: false,
});

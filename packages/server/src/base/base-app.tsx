import { OpenAPIHono } from "@hono/zod-openapi";

type Variables = {
	authId: string;
	clientId: string;
	businessId?: string;
};

// type Variables = JwtVariables
// Compatible with the Next.JS 14 API routes
export const base_api_path = "/api";

export const app = new OpenAPIHono<{ Variables: Variables }>({
	strict: false,
});

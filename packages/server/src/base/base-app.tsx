import { OpenAPIHono } from "@hono/zod-openapi";

// type Variables = JwtVariables
// Compatible with the Next.JS 14 API routes
export const base_api_path = "/api";

export function createApp() {
	const app = new OpenAPIHono({
		strict: false,
	});
	return app;
}

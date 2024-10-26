import { OpenAPIHono } from "@hono/zod-openapi";
import { Hono } from "hono";
import { AppOpenAPI } from "./type";
import { apiReference } from "@scalar/hono-api-reference";

// type Variables = JwtVariables
// Compatible with the Next.JS 14 API routes
export const base_api_path = "/api";

export const app = new OpenAPIHono({
	strict: false,
});

export function withOpenApi(app: AppOpenAPI) {
	app.doc("/api/docs", {
		openapi: "3.0.0",
		info: {
			title: "MM Tech API",
			version: "1.0.0",
		},
	});

	app.get(
		"/api/scalar",
		apiReference({
			theme: "bluePlanet",
			defaultHttpClient: {
				targetKey: "node",
				clientKey: "axios",
			},
			spec: {
				url: "/api/docs",
			},
		}),
	);
}

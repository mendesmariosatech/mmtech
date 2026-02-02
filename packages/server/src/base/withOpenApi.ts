import { apiReference } from "@scalar/hono-api-reference";
import { AppOpenAPI } from "./type";
import { OpenAPIHono } from "@hono/zod-openapi";

export function withOpenApi(app: OpenAPIHono<AppOpenAPI>) {
	app.doc("/api/docs", {
		openapi: "3.0.0",
		info: {
			title: "MM Tech API",
			version: "1.0.0",
		},
	});

	app.get(
		"/api/swagger",
		apiReference({
			cdn: "https://cdn.jsdelivr.net/npm/@scalar/api-reference@1.25.80",
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

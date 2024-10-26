import { apiReference } from "@scalar/hono-api-reference";
import { AppOpenAPI } from "./type";

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

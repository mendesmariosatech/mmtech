import { handle } from "hono/vercel";
import { app, base_api_path } from "./base/base-app";
import { hc } from "hono/client";
import { authRouter } from "./routes/auth";
import { withOpenApi } from "./base/withOpenApi";
import { personalRouter } from "./routes/personal";
import { apiReference } from "@scalar/hono-api-reference";

const newApp = app.basePath(base_api_path);

newApp.doc("/docs", {
	openapi: "3.0.0",
	info: {
		title: "MM Tech API",
		version: "0.0.9",
	},
});

const route = newApp
	.get("/", (c) => c.text("Your API is working!"))
	.route("/", authRouter)
	.route("/", personalRouter);
// withOpenApi(app);

newApp.get(
	"/scalar",
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

export default app;
export { handle, hc };

export type AppType = typeof route;

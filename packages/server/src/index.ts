import { handle } from "hono/vercel";
import { app } from "./base/base-app";
import { authRoute } from "./routes/auth/auth";
import { hc } from "hono/client";
import { personalRoute } from "./routes/personal/me";
import { secret } from "./routes/secret/routeTest";
import { swaggerUI } from "@hono/swagger-ui";
import { videoHandler, videoSpec } from "./routes/videos/videos";
import { apiReference } from "@scalar/hono-api-reference";

app.doc("/docs", {
	openapi: "3.0.0",
	info: {
		title: "MM Tech API",
		version: "1.0.0",
	},
});

app.openapi(videoSpec, videoHandler);

const route = app
	.get("/", (c) => c.text("Hello Hono!"))
	.route("/auth", authRoute)
	.route("/personal", personalRoute)
	.route("/private/secret", secret);

app.get(
	"/scalar",
	apiReference({
		theme: "bluePlanet",
		layout: "classic",
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

// front ou o backend que deveria se preocupar com o endereço da URL

export type AppType = typeof route;

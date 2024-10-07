import { handle } from "hono/vercel";
import { app } from "./base/base-app";
import { authRoute } from "./routes/auth/register";
import { hc } from "hono/client";
import { personalRoute } from "./routes/personal/me";
import { secret } from "./routes/secret/test";
import { swaggerUI } from "@hono/swagger-ui";

const route = app
	.get("/", (c) => c.text("Hello Hono!"))
	.route("/auth", authRoute)
	.route("/personal", personalRoute)
	.route("/private/secret", secret);

app.get("/ui", swaggerUI({ urls: "api/docs" }));
export default app;
export { handle, hc };

// front ou o backend que deveria se preocupar com o endereço da URL

export type AppType = typeof route;

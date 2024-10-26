import { handle } from "hono/vercel";
import { app, base_api_path } from "./base/base-app";
import { hc } from "hono/client";
import { authRouter } from "./routes/auth";
import { withOpenApi } from "./base/withOpenApi";

// VIDEOS ROUTES
// videosRoutes.forEach(([route, handler]) => app.openapi(route, handler));

// authRouter.forEach();

// authRouter.map((route) => app.route("/", route))

// const route = app.basePath(base_api_path)
//   .get("/", (c) => c.text("Hello Hono!"))
//   .route("/personal", personalRoute)
//   .route("/private/secret", secret)
// .route("/auth", authRouter[1])

const route = app
	.basePath(base_api_path)
	.get("/", (c) => c.text("Your API is working!"))
	.route("/", authRouter);

withOpenApi(app);

export default app;
export { handle, hc };

export type AppType = typeof route;

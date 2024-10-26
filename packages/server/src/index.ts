import { handle } from "hono/vercel";
import { base_api_path, app } from "./base/base-app";
import { hc } from "hono/client";
import { authRouter } from "./routes/auth";
import { withOpenApi } from "./base/withOpenApi";
import { personalRouter } from "./routes/personal";

const route = app
	.basePath(base_api_path)
	.get("/", (c) => c.text("Your API is working!"))
	.route("/", authRouter)
	.route("/", personalRouter);

withOpenApi(app);

export default app;
export { handle, hc };

export type AppType = typeof route;

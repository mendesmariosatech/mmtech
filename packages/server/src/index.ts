import { base_api_path, app } from "./base/base-app";
import { authRouter } from "./routes/auth";
import { withOpenApi } from "./base/withOpenApi";
import { personalRouter } from "./routes/personal";
import { calendarRouter } from "./routes/calendar";

const route = app
	.basePath(base_api_path)
	.get("/", (c) => c.text("Your API is working!"))
	.route("/", authRouter)
	.route("/", calendarRouter)
	.route("/", personalRouter);

withOpenApi(app);

export default app;

export type AppType = typeof route;

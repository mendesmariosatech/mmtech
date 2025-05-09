import { base_api_path, app } from "./base/base-app";
import { authRouter } from "./routes/auth";
import { withOpenApi } from "./base/withOpenApi";
import { personalRouter } from "./routes/personal";
import { calendarRouter } from "./routes/calendar";
import { businessRouter } from "./routes/business";
import { videosRouter } from "./routes/videos";
import { templateRouter } from "./routes/landing-page";
import { plansRouter } from "./routes/plans";

const route = app
	.basePath(base_api_path) // in order to work with Next.js API routes
	.get("/", (c) => c.text("Your API is working!"))
	.route("/", authRouter)
	.route("/", businessRouter)
	.route("/", calendarRouter)
	.route("/", personalRouter)
	.route("/", videosRouter)
	.route("/", plansRouter)
	.route("/", templateRouter);

withOpenApi(app);

export default app;

export type AppType = typeof route;

import { createApp } from "../../base/base-app";
import { authMiddleware } from "../../middleware/authentication";
import { personalRoute, personalHandler } from "./me";

const app = createApp();

const personalRouter = app.openapi(personalRoute, personalHandler);

personalRouter.use("/api/personal/*", authMiddleware);

export { personalRouter };

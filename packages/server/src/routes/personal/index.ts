import { app } from "../../base/base-app";
import { authMiddleware } from "../middleware/authentication";
import { personalRoute, personalHandler } from "./me";

const personalRouter = app.openapi(personalRoute, personalHandler);

personalRouter.use("/api/personal/*", authMiddleware);

export { personalRouter };

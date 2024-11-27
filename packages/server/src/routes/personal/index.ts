import { app } from "../../base/base-app";
import { personalRoute, personalHandler } from "./me";

const personalRouter = app.openapi(personalRoute, personalHandler);

export { personalRouter };

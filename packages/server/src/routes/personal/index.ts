import { app } from "../../base/base-app";
import { authMiddleware } from "../../middleware/authentication";
import { personalRoute, personalHandler } from "./me";

// const withMiddleware = () => {
//   app.use(authMiddleware);
//   return app;
// };
export const personalRouter = app.openapi(personalRoute, personalHandler);

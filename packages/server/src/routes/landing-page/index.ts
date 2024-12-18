import { app } from "../../base/base-app";
import { createTemplateHandler, createTemplateSpec } from "./create-template";

const templateRouter = app.openapi(createTemplateSpec, createTemplateHandler);

export { templateRouter };

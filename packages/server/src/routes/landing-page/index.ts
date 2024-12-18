import { app } from "../../base/base-app";
import { createPageHandler, createPageSpec } from "./create-page";
import { createTemplateHandler, createTemplateSpec } from "./create-template";

const templateRouter = app
	.openapi(createTemplateSpec, createTemplateHandler)
	.openapi(createPageSpec, createPageHandler);

export { templateRouter };

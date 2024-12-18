import { app } from "../../base/base-app";
import { createPageHandler, createPageSpec } from "./create-page";
import { createTemplateHandler, createTemplateSpec } from "./create-template";
import {
	getAllTemplatesHandler,
	getAllTemplatesSpec,
} from "./get-all-templates";
import {
	getTemplateByIdHandler,
	getTemplateByIdSpec,
} from "./get-template-by-id";

const templateRouter = app
	.openapi(createTemplateSpec, createTemplateHandler)
	.openapi(getTemplateByIdSpec, getTemplateByIdHandler)
	.openapi(getAllTemplatesSpec, getAllTemplatesHandler)
	.openapi(createPageSpec, createPageHandler);

export { templateRouter };

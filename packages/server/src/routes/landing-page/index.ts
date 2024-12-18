import { app } from "../../base/base-app";
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
	.openapi(getAllTemplatesSpec, getAllTemplatesHandler);

export { templateRouter };

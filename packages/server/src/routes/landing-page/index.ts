import { app } from "../../base/base-app";
import { createPageHandler, createPageSpec } from "./page/create-page";
import {
	createTemplateHandler,
	createTemplateSpec,
} from "./template/create-template";
import {
	getAllTemplatesHandler,
	getAllTemplatesSpec,
} from "./template/get-all-templates";
import {
	getTemplateByIdHandler,
	getTemplateByIdSpec,
} from "./template/get-template-by-id";

const templateRouter = app
	.openapi(createTemplateSpec, createTemplateHandler)
	.openapi(getTemplateByIdSpec, getTemplateByIdHandler)
	.openapi(getAllTemplatesSpec, getAllTemplatesHandler)
	.openapi(createPageSpec, createPageHandler);

export { templateRouter };

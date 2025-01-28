import { app } from "../../base/base-app";
import { createPageHandler, createPageSpec } from "./page/create-page";
import {
	getAllPagesByTemplateHandler,
	getAllPagesByTemplateSpec,
} from "./page/getAllPages";
import { getPageByIdHandler, getPageByIdSpec } from "./page/getPageById";
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
	.openapi(createPageSpec, createPageHandler)
	.openapi(getAllPagesByTemplateSpec, getAllPagesByTemplateHandler)
	.openapi(getPageByIdSpec, getPageByIdHandler);

export { templateRouter };

import { app } from "../../base/base-app";
import {
	createMasterPlanHandler,
	createMasterPlanSpec,
} from "./create-master-plan";
import { getMasterPlansHandler, getMasterPlansSpec } from "./get-master-plans";
import { getMasterPlanHandler, getMasterPlanSpec } from "./get-master-plan";

const plansRouter = app
	.openapi(createMasterPlanSpec, createMasterPlanHandler)
	.openapi(getMasterPlansSpec, getMasterPlansHandler)
	.openapi(getMasterPlanSpec, getMasterPlanHandler);

export { plansRouter };

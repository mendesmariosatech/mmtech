import { app } from "../../base/base-app";
import {
	createMasterPlanHandler,
	createMasterPlanSpec,
} from "./create-master-plan";
import { getMasterPlansHandler, getMasterPlansSpec } from "./get-master-plans";

const plansRouter = app
	.openapi(createMasterPlanSpec, createMasterPlanHandler)
	.openapi(getMasterPlansSpec, getMasterPlansHandler);

export { plansRouter };

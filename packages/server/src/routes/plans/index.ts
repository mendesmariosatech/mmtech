import { app } from "../../base/base-app";
import {
	createMasterPlanHandler,
	createMasterPlanSpec,
} from "./create-master-plan";

const plansRouter = app.openapi(createMasterPlanSpec, createMasterPlanHandler);

export { plansRouter };

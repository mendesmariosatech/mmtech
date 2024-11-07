import { app } from "../../base/base-app";
import { createBusinessHandler, createBusinessSpec } from "./postBusiness";

export const businessRouter = app.openapi(
	createBusinessSpec,
	createBusinessHandler,
);

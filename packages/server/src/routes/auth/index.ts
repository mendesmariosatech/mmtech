import { app } from "../../base/base-app";
import { loginHandler, loginSpec } from "./login";
import { registerHandler, registerSpec } from "./register";

export const authRouter = app
	.openapi(loginSpec, loginHandler)
	.openapi(registerSpec, registerHandler);

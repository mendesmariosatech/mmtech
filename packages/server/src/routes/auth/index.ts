import { createApp } from "../../base/base-app";
import { loginHandler, loginSpec } from "./login";
import { logoutHandler, logoutSpec } from "./logout";
import { registerHandler, registerSpec } from "./register";

const app = createApp();

export const authRouter = app
	.openapi(loginSpec, loginHandler)
	.openapi(registerSpec, registerHandler)
	.openapi(logoutSpec, logoutHandler);

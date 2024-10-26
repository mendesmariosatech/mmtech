// import { app } from "../../base/base-app";
import { OpenAPIHono } from "@hono/zod-openapi";
import { loginHandler, loginSpec } from "./login";
import { registerHandler, registerSpec } from "./register";

export const authRouter = new OpenAPIHono({
	strict: false,
})
	.openapi(loginSpec, loginHandler)
	.openapi(registerSpec, registerHandler);

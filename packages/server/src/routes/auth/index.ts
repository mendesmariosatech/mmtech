import { app } from "../../base/base-app";
import { loginHandler, loginSpec } from "./login";
import { registerHandler, registerSpec } from "./register";

export const authRoutes = [
	[registerSpec, registerHandler],
	[loginSpec, loginHandler],
] as const;

export const authRouter = authRoutes.map(([route, handler]) =>
	app.openapi(route, handler),
);

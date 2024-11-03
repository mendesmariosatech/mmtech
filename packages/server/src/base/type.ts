import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { ENV_TYPES } from "@repo/zod-types";

type Variables = {
	authId: string;
	clientId: string;
	businessId?: string;
};
export type AppOpenAPI = {
	Variables: Variables;
	Bindings: ENV_TYPES;
};

export type AppRouteHandler<T extends RouteConfig> = RouteHandler<
	T,
	{ Variables: Variables; Bindings: ENV_TYPES }
>;

import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { ENV_TYPES } from "@repo/zod-types";
import { DBConnection } from "../drizzle/drizzle-client";

type Variables = {
	authId: string;
	clientId: string;
	businessId?: string;
	db: DBConnection;
};
export type AppOpenAPI = {
	Variables: Variables;
	Bindings: ENV_TYPES;
};

export type AppRouteHandler<T extends RouteConfig> = RouteHandler<
	T,
	{ Variables: Variables; Bindings: ENV_TYPES }
>;

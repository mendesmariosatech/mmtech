import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { ENV_TYPES } from "@repo/zod-types";
import { DBConnection, DBConnectionFunc } from "../drizzle/drizzle-client";
import { VideoDTO } from "../drizzle/videos/videos.dto";

type Variables = {
	authId: string;
	clientId: string;
	businessId?: string;
	db: DBConnectionFunc;
	dto: {
		Videos: VideoDTO;
	};
};
export type AppOpenAPI = {
	Variables: Variables;
	Bindings: ENV_TYPES;
};

export type AppRouteHandler<T extends RouteConfig> = RouteHandler<
	T,
	{ Variables: Variables; Bindings: ENV_TYPES }
>;

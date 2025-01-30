import { env } from "hono/adapter";
import {
	CreateComponentSchema,
	CreateMergeComponentSchema,
	GetMergedSchema,
} from "../../../drizzle/landing-page/component/component";
import { createRoute, z } from "@hono/zod-openapi";
import { AppRouteHandler } from "../../../base/type";
import { ComponentTable } from "../../../drizzle/landing-page/component/component.dto";

export const createComponentSpec = createRoute({
	method: "post",
	path: "/landing-page/{pageId}/components",
	tags: ["templates"],
	request: {
		params: z.object({
			pageId: z.string(),
		}),
		body: {
			content: {
				"application/json": {
					schema: CreateMergeComponentSchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: "Component Created",
			content: {
				"application/json": {
					schema: z.object({
						data: GetMergedSchema,
					}),
				},
			},
		},
		404: {
			description: "Page not found",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
		},
		500: {
			description: "Internal Server Error",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
		},
	},
});

type CreateComponentSpec = typeof createComponentSpec;

export const createComponentHandler: AppRouteHandler<
	CreateComponentSpec
> = async (c) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);
	const body = c.req.valid("json");

	const componentTable = new ComponentTable(
		TURSO_CONNECTION_URL,
		TURSO_AUTH_TOKEN,
	);

	const newComponent = await componentTable.createComponent(body);

	return c.json({ data: newComponent }, 201);
};

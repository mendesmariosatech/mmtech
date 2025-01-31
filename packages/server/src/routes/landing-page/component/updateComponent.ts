import { env } from "hono/adapter";
import {
	GetMergedSchema,
	UpdateMergeComponentSchema,
} from "../../../drizzle/landing-page/component/component";
import { createRoute, z } from "@hono/zod-openapi";
import { AppRouteHandler } from "../../../base/type";
import { ComponentTable } from "../../../drizzle/landing-page/component/component.dto";

export const updateComponentsSpec = createRoute({
	method: "patch",
	path: "/landing-page/{pageId}/components/{componentId}",
	tags: ["templates"],
	request: {
		params: z.object({
			pageId: z.string(),
			componentId: z.string(),
		}),

		body: {
			content: {
				"application/json": {
					schema: UpdateMergeComponentSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: "Update component",
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

type UpdateComponentsSpec = typeof updateComponentsSpec;
export const updateComponentsHandler: AppRouteHandler<
	UpdateComponentsSpec
> = async (c) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);

	const componentTable = new ComponentTable(
		TURSO_CONNECTION_URL,
		TURSO_AUTH_TOKEN,
	);

	const { pageId, componentId } = c.req.valid("param");

	console.log({
		pageId,
		componentId,
	});

	// this will fail miserably
	try {
		const components = await componentTable.getAllComponentsByTemplate(
			Number(pageId),
		);
	} catch {
		return c.json({ error: "Page not found" }, 404);
	}

	return c.json({ error: "Not Implemented" }, 500);
};

import { env } from "hono/adapter";
import { GetMergedSchema } from "../../../drizzle/landing-page/component/component";
import { createRoute, z } from "@hono/zod-openapi";
import { AppRouteHandler } from "../../../base/type";
import { ComponentTable } from "../../../drizzle/landing-page/component/component.dto";

export const getComponentsSpec = createRoute({
	method: "get",
	path: "/landing-page/{pageId}/components",
	tags: ["templates"],
	request: {
		params: z.object({
			pageId: z.string(),
		}),
	},
	responses: {
		200: {
			description: "Get components by Page",
			content: {
				"application/json": {
					schema: z.object({
						data: GetMergedSchema.array(),
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

type GetComponentsSpec = typeof getComponentsSpec;
export const getComponentsHandler: AppRouteHandler<GetComponentsSpec> = async (
	c,
) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);

	const componentTable = new ComponentTable(
		TURSO_CONNECTION_URL,
		TURSO_AUTH_TOKEN,
	);

	const { pageId } = c.req.valid("param");

	try {
		const components = await componentTable.getAllComponentsByTemplate(
			Number(pageId),
		);
		return c.json({ data: components });
	} catch {
		return c.json({ error: "Page not found" }, 404);
	}
};
// Test commit to verify push functionality

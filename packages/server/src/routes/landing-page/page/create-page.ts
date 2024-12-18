import { env } from "hono/adapter";
import { AppRouteHandler } from "../../../base/type";
import { CreatePageSchema } from "../../../drizzle/landing-page/page/page";
import { PageTable } from "../../../drizzle/landing-page/page/page.dto";
import { createRoute, z } from "@hono/zod-openapi";

export const createPageSpec = createRoute({
	method: "post",
	path: "/landing-page/{templateId}/pages",
	tags: ["templates"],
	request: {
		params: z.object({
			templateId: z.string(),
		}),
		body: {
			content: {
				"application/json": {
					schema: CreatePageSchema.omit({ templateId: true }),
				},
			},
		},
	},
	responses: {
		201: {
			description: "Page Created",
			content: {
				"application/json": {
					schema: CreatePageSchema,
				},
			},
		},
	},
});

type CreatePageSpec = typeof createPageSpec;

export const createPageHandler: AppRouteHandler<CreatePageSpec> = async (c) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);

	const body = c.req.valid("json");
	const { templateId } = c.req.valid("param");

	const Page = new PageTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	const template = await Page.createPage({
		...body,
		templateId,
	});

	return c.json(template, 201);
};

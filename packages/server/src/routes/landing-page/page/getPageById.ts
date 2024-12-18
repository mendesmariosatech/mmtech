import { createRoute, z } from "@hono/zod-openapi";
import { CreateTemplateSchema } from "../../../drizzle/landing-page/template/template";
import { AppRouteHandler } from "../../../base/type";
import { env } from "hono/adapter";
import { TemplateTable } from "../../../drizzle/landing-page/template/template.dto";
import { SelectPageSchema } from "../../../drizzle/landing-page/page/page";
import { PageTable } from "../../../drizzle/landing-page/page/page.dto";

export const createTemplateSpec = createRoute({
	method: "get",
	path: "/landing-page/templates/{templateId}/pages/{pageId}",
	tags: ["templates"],
	request: {
		params: z.object({
			templateId: z.string(),
			pageId: z.string(),
		}),
	},
	responses: {
		200: {
			description: "Template Created",
			content: {
				"application/json": {
					schema: SelectPageSchema,
				},
			},
		},
	},
});

type CreateTemplateSpec = typeof createTemplateSpec;

export const createTemplateHandler: AppRouteHandler<
	CreateTemplateSpec
> = async (c) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);
	const Page = new PageTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	const { pageId } = c.req.valid("param");

	const page = await Page.getPageById(pageId);

	return c.json(page, 200);
};

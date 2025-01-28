import { env } from "hono/adapter";
import { AppRouteHandler } from "../../../base/type";
import { CreatePageSchema } from "../../../drizzle/landing-page/page/page";
import { PageTable } from "../../../drizzle/landing-page/page/page.dto";
import { createRoute, z } from "@hono/zod-openapi";

export const getAllPagesByTemplateSpec = createRoute({
	method: "get",
	path: "/landing-page/{templateId}/pages",
	tags: ["templates"],
	request: {
		params: z.object({
			templateId: z.string(),
		}),
	},
	responses: {
		201: {
			description: "Page Created",
			content: {
				"application/json": {
					schema: CreatePageSchema.array(),
				},
			},
		},
	},
});

type GetAllPageSpec = typeof getAllPagesByTemplateSpec;

export const getAllPagesByTemplateHandler: AppRouteHandler<
	GetAllPageSpec
> = async (c) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);

	const { templateId } = c.req.valid("param");

	const Page = new PageTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	const pages = await Page.getAllPagesByTemplate(templateId);

	return c.json(pages, 201);
};

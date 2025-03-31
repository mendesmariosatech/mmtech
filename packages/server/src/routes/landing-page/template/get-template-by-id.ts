import { createRoute, z } from "@hono/zod-openapi";
import { env } from "hono/adapter";
import { AppRouteHandler } from "../../../base/type";
import { CreateTemplateSchema } from "../../../drizzle/landing-page/template/template";
import { TemplateTable } from "../../../drizzle/landing-page/template/template.dto";

export const getTemplateByIdSpec = createRoute({
	method: "get",
	path: "/landing-page/templates/{templateId}",
	tags: ["templates"],
	request: {
		params: z.object({
			templateId: z.string(),
		}),
	},
	responses: {
		200: {
			description: "Template Found",
			content: {
				"application/json": {
					schema: CreateTemplateSchema,
				},
			},
		},
	},
});

type GetTemplateSpec = typeof getTemplateByIdSpec;

export const getTemplateByIdHandler: AppRouteHandler<GetTemplateSpec> = async (
	c,
) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);

	const { templateId } = c.req.valid("param");
	const Template = new TemplateTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	const template = await Template.getTemplateById(templateId);

	return c.json(template, 200);
};

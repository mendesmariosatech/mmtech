import { createRoute } from "@hono/zod-openapi";
import { env } from "hono/adapter";
import { AppRouteHandler } from "../../../base/type";
import { TemplateTable } from "../../../drizzle/landing-page/template/template.dto";
import { CreateTemplateSchema } from "../../../drizzle/landing-page/template/template";

export const getAllTemplatesSpec = createRoute({
	method: "get",
	path: "/landing-page/templates",
	tags: ["templates"],
	responses: {
		200: {
			description: "Template Created",
			content: {
				"application/json": {
					schema: CreateTemplateSchema.array(),
				},
			},
		},
	},
});

type GetAllTemplatesSpec = typeof getAllTemplatesSpec;

export const getAllTemplatesHandler: AppRouteHandler<
	GetAllTemplatesSpec
> = async (c) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);
	const Template = new TemplateTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	const template = await Template.getAllTemplates();

	return c.json(template, 200);
};

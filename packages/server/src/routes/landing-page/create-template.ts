import { createRoute } from "@hono/zod-openapi";
import { CreateTemplateSchema } from "../../drizzle/landing-page/template";
import { AppRouteHandler } from "../../base/type";
import { env } from "hono/adapter";
import { TemplateTable } from "../../drizzle/landing-page/template.dto";

export const createTemplateSpec = createRoute({
	method: "post",
	path: "/landing-page/templates",
	tags: ["templates"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: CreateTemplateSchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: "Template Created",
			content: {
				"application/json": {
					schema: CreateTemplateSchema,
				},
			},
		},
		// 403: {
		//     description: "Not Authorized",
		//     content: {
		//         "application/json": {
		//             schema: z.object({
		//                 error: z.string(),
		//             }),
		//         },
		//     },
		// },
		// 500: {
		//     description: "Not Authorized",
		//     content: {
		//         "application/json": {
		//             schema: z.object({
		//                 error: z.string(),
		//             }),
		//         },
		//     },
		// },
	},
});

type CreateTemplateSpec = typeof createTemplateSpec;

export const createTemplateHandler: AppRouteHandler<
	CreateTemplateSpec
> = async (c) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);

	const Template = new TemplateTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	const body = await c.req.json();

	const template = await Template.createTemplate(body);

	return c.json(template, 201);
};

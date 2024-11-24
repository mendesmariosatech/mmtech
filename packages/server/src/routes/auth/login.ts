import { createRoute, z } from "@hono/zod-openapi";
import { loginFields } from "@repo/zod-types";
import { env } from "hono/adapter";
import { AuthTable, ClientTable } from "./handlers";
import { checkPassword } from "../../utils/bcrypt";
import { generateToken } from "../../jwt_token";
import { setCookie } from "hono/cookie";
import { COOKIES } from "../../env/cookies";
import type { AppRouteHandler } from "../../base/type";
import { BusinessTable } from "../business/dto/business.dto";

export const loginSpec = createRoute({
	method: "post",
	path: "/auth/login",
	tags: ["auth"],
	responses: {
		200: {
			description: "Register Successful",
			content: {
				"application/json": {
					schema: z.object({
						data: z.object({
							name: z.string(),
							email: z.string(),
							phone: z.string().nullable(),
							id: z.string(),
							emailConfirmedAt: z.string().nullable(),
							createdAt: z.string(),
							deletedAt: z.string().nullable(),
							updatedAt: z.string().nullable(),
							token: z.string(),
						}),
					}),
				},
			},
		},
		400: {
			description: "Bad Request",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
		},
		403: {
			description: "Bad Request",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
		},
		404: {
			description: "Not Found",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
		},
	},
	request: {
		body: {
			content: {
				"application/json": {
					schema: loginFields,
				},
			},
		},
	},
});

type LoginRoute = typeof loginSpec;

export const loginHandler: AppRouteHandler<LoginRoute> = async (c) => {
	const form = c.req.valid("json");
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL, JWT_SECRET_KEY } = env(c);

	if (!form) return c.json({ error: "Invalid form data" }, 400);

	const { email, password } = form;

	const Auth = new AuthTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	const user = await Auth.findAuthUser(email);
	if (!user) return c.json({ error: "User not found" }, 404);

	const doesPasswordMatch = await checkPassword(password, user.password);

	if (!doesPasswordMatch)
		return c.json({ error: "Password does not match" }, 403);

	const Client = new ClientTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	const client = await Client.findClientByAuth(user.id);

	if (!client) return c.json({ error: "Client not found" }, 404);

	const Business = new BusinessTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	const business = await Business.findBusinessByClientId(client.id);

	const token = await generateToken(
		{
			clientId: client.id,
			authId: user.id,
			businessId: business?.id,
		},
		JWT_SECRET_KEY,
	);

	setCookie(c, COOKIES.USER_ID, user.email);
	setCookie(c, COOKIES.USER_TOKEN, token);

	const { password: NOT_USE, ...rest } = user;

	const data = { ...rest, token };

	return c.json({ data }, 200);
};

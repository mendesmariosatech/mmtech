import { createRoute, RouteHandler, z } from "@hono/zod-openapi";
import { ENV_TYPES, loginFields } from "@repo/zod-types";
import { env } from "hono/adapter";
import { AuthTable } from "./handlers";
import { checkPassword } from "../../utils/bcrypt";
import { generateToken } from "../../jwt_token";
import { setCookie } from "hono/cookie";
import { COOKIES } from "../../env/cookies";

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
							deletedAt: z.string().nullable(),
							createdAt: z.string(),
							updateAt: z.string().nullable(),
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

export const loginHandler: RouteHandler<LoginRoute> = async (c) => {
	const form = c.req.valid("json");
	const {
		TURSO_AUTH_TOKEN,
		TURSO_CONNECTION_URL,
		COOkIE_SECRET_KEY,
		JWT_SECRET_KEY,
	} = env<ENV_TYPES>(c);

	if (!form) return c.json({ error: "Invalid form data" }, 400);

	const { email, password } = form;

	const Auth = new AuthTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	const user = await Auth.findAuthUser(email);
	if (!user) return c.json({ error: "User not found" }, 404);

	const doesPasswordMatch = await checkPassword(password, user.passwordDigest);

	if (!doesPasswordMatch)
		return c.json({ error: "Password does not match" }, 403);

	const token = await generateToken(user, JWT_SECRET_KEY);

	setCookie(c, COOKIES.USER_ID, user.email);
	setCookie(c, COOKIES.USER_TOKEN, token);

	const { passwordDigest: NOT_USE, ...rest } = user;

	return c.json({ data: rest }, 200);
};

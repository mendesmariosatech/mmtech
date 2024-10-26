import { createRoute, RouteHandler, z } from "@hono/zod-openapi";
import { registerFields } from "@repo/zod-types";
import { ENV_TYPES } from "../../env/zod";
import { env } from "hono/adapter";
import { AuthTable, ClientTable } from "./handlers";
import { hashPassword } from "../../utils/bcrypt";
import { generateToken } from "../../jwt_token";
import { setCookie } from "hono/cookie";
import { COOKIES } from "../../env/cookies";

export const registerSpec = createRoute({
	method: "post",
	path: "/auth/register",
	tags: ["auth"],
	responses: {
		201: {
			description: "Register Successful",
			content: {
				"application/json": {
					schema: z.object({
						data: z.object({
							auth: z.object({
								phone: z.string().nullish(),
								authId: z.string(),
								name: z.string(),
								email: z.string(),
							}),
							clientId: z.string(),
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
	},
	request: {
		body: {
			content: {
				"application/json": {
					schema: registerFields,
				},
			},
		},
	},
});

type RegisterRoute = typeof registerSpec;

export const registerHandler: RouteHandler<RegisterRoute> = async (c) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL, JWT_SECRET_KEY } =
		env<ENV_TYPES>(c);
	// get the ENV variable from a zod validator
	// if (!TURSO_CONNECTION_URL || !TURSO_AUTH_TOKEN) {
	//   return c.json({ error: "No ENV file" }, 500);
	// }

	const form = c.req.valid("json");

	if (!form) return c.json({ error: "Invalid form data" }, 400);

	const { email, password, name, phone } = form;

	const Auth = new AuthTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	const Client = new ClientTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	const authUser = await Auth.findAuthUser(email);
	if (authUser) return c.json({ error: "User already exists" }, 400);

	const passwordDigest = await hashPassword(password);
	if (!passwordDigest) return c.json({ error: "Password digest failed" }, 400);

	const newAuthUser = await Auth.registerAuthUser({
		email,
		passwordDigest,
		name,
		phone,
	});
	if (!newAuthUser) return c.json({ error: "User creation failed" }, 400);

	const token = await generateToken(newAuthUser, JWT_SECRET_KEY);

	setCookie(c, COOKIES.USER_ID, newAuthUser.email);
	setCookie(c, COOKIES.USER_TOKEN, token);

	const [newClient, error] = await Client.createNewClient({
		authId: newAuthUser.id,
	});

	if (error) return c.json({ error: error.message }, 400);
	if (!newClient) return c.json({ error: "Client creation failed" }, 400);

	return c.json(
		{
			data: {
				auth: {
					phone: newAuthUser.phone,
					authId: newAuthUser.id,
					name: newAuthUser.name,
					email: newAuthUser.email,
				},
				clientId: newClient.id,
				token: token,
			},
		},
		201,
	);
};

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { AuthTable, ClientTable } from "./handlers";
import { hashPassword, checkPassword } from "../../utils/bcrypt";
import { env } from "hono/adapter";
import type { ENV_TYPES } from "../../env/zod";
import { generateToken } from "../../jwt_token";
import { setCookie } from "hono/cookie";
import { COOKIES } from "../../env/cookies";
import { loginFields, registerFields } from "@repo/zod-types";

const registerFormValidation = zValidator("json", registerFields);
const loginFormValidation = zValidator("json", loginFields);

export const authRoute = new Hono()
	.post("/register", registerFormValidation, async (c) => {
		const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL, JWT_SECRET_KEY } =
			env<ENV_TYPES>(c);
		if (!TURSO_CONNECTION_URL || !TURSO_AUTH_TOKEN) {
			return c.json({ error: "No ENV file" }, 500);
		}
		const form = c.req.valid("json");

		if (!form) return c.json({ error: "Invalid form data" }, 400);

		const { email, password, name, phone } = form;

		const Auth = new AuthTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
		const Client = new ClientTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

		const authUser = await Auth.findAuthUser(email);
		if (authUser) return c.json({ error: "User already exists" }, 400);

		const passwordDigest = await hashPassword(password);
		if (!passwordDigest)
			return c.json({ error: "Password digest failed" }, 400);

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
	})
	.post("/login", loginFormValidation, async (c) => {
		const {
			TURSO_AUTH_TOKEN,
			TURSO_CONNECTION_URL,
			COOkIE_SECRET_KEY,
			JWT_SECRET_KEY,
		} = env<ENV_TYPES>(c);
		const form = c.req.valid("json");

		if (!form) return c.json({ error: "Invalid form data" }, 400);

		const { email, password } = form;

		const Auth = new AuthTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
		const user = await Auth.findAuthUser(email);
		if (!user) return c.json({ error: "User not found" }, 404);

		const doesPasswordMatch = await checkPassword(
			password,
			user.passwordDigest,
		);

		if (!doesPasswordMatch)
			return c.json({ error: "Password does not match" }, 403);

		const token = await generateToken(user, JWT_SECRET_KEY);

		setCookie(c, COOKIES.USER_ID, user.email);
		setCookie(c, COOKIES.USER_TOKEN, token);

		const { passwordDigest: NOT_USE, ...rest } = user;

		return c.json({ data: rest }, 201);
	});

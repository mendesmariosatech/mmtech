import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { AuthTable } from "./handlers";
import { hashPassword, checkPassword } from "../../utils/bcrypt";
import { env } from "hono/adapter";
import type { ENV_TYPES } from "../../env/zod";
import { generateToken } from "../../jwt_token";
import { setCookie, setSignedCookie } from "hono/cookie";
import { COOKIES } from "../../cookies";
import { loginFields, registerFields } from "@repo/zod-types";

const registerFormValidation = zValidator("json", registerFields);
const loginFormValidation = zValidator("json", loginFields);


export const authRoute = new Hono()
	.post("/register", registerFormValidation, async (c) => {
		const {
			TURSO_AUTH_TOKEN,
			TURSO_CONNECTION_URL,
			JWT_SECRET_KEY,
			COOkIE_SECRET_KEY,
		} = env<ENV_TYPES>(c);
		const form = c.req.valid("json");

		if (!form) return c.json({ error: "Invalid form data" }, 400);

		const { email, password, name, phone } = form;
		const Auth = new AuthTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

		const user = await Auth.findUser(email);
		if (user) return c.json({ error: "User already exists" }, 400);

		const passwordDigest = await hashPassword(password);
		if (!passwordDigest)
			return c.json({ error: "Password digest failed" }, 400);

		const newUser = await Auth.registerUser(email, passwordDigest);
		if (!newUser) return c.json({ error: "User creation failed" }, 400);

		const token = await generateToken(newUser, JWT_SECRET_KEY);

		setCookie(c, COOKIES.USER_ID, newUser.email);
		setCookie(c, COOKIES.USER_TOKEN, token);

		return c.json({ data: { newUser, token: token } }, 201);
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
		const user = await Auth.findUser(email);
		if (!user) return c.json({ error: "User not found" }, 404);

		const doesPasswordMatch = await checkPassword(password, user.passwordDigest)
		if (!doesPasswordMatch) return c.json({ error: "Password does not match" }, 403);

		const token = await generateToken(user, JWT_SECRET_KEY);

		setCookie(c, COOKIES.USER_ID, user.email);
		setCookie(c, COOKIES.USER_TOKEN, token);
		return c.json({ data: user }, 201);
	});

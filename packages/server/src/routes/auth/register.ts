import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { AuthTable } from "./handlers";
import { hashPassword } from "../../utils/bcrypt";
import { env } from "hono/adapter";
import type { ENV_TYPES } from "../../env/zod";
import { generateToken } from "../../jwt_token";
import { setCookie, setSignedCookie } from "hono/cookie";
import { COOKIES } from "../../cookies";
import { registerFields } from "@repo/zod-types";

const formValidation = zValidator("json", registerFields);

export const authRoute = new Hono()
	.post("/register", formValidation, async (c) => {
		const {
			TURSO_AUTH_TOKEN,
			TURSO_CONNECTION_URL,
			JWT_SECRET_KEY,
			COOkIE_SECRET_KEY,
		} = env<ENV_TYPES>(c);
		const form = c.req.valid("json");

		if (!form) return c.json({ error: "Invalid form data" }, 400);

		const { email, password, name, phone } = form;
		const auth = new AuthTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

		const user = await auth.findUser(email);
		if (user) return c.json({ error: "User already exists" }, 400);

		const passwordDigest = await hashPassword(password);
		if (!passwordDigest)
			return c.json({ error: "Password digest failed" }, 400);

		const newUser = await auth.registerUser(email, passwordDigest);
		if (!newUser) return c.json({ error: "User creation failed" }, 400);

		const token = await generateToken(newUser, JWT_SECRET_KEY);

		setCookie(c, COOKIES.USER_ID, newUser.email);
		await setSignedCookie(c, COOKIES.USER_TOKEN, token, COOkIE_SECRET_KEY);

		return c.json({ data: { newUser, token: token } }, 201);
	})
	.post("/login", formValidation, async (c) => {
		const {
			TURSO_AUTH_TOKEN,
			TURSO_CONNECTION_URL,
			COOkIE_SECRET_KEY,
			JWT_SECRET_KEY,
		} = env<ENV_TYPES>(c);
		const form = c.req.valid("json");

		if (!form) return c.json({ error: "Invalid form data" }, 400);

		const { email, password } = form;

		const auth = new AuthTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
		const user = await auth.findUser(email);

		if (!user) return c.json({ error: "User not found" }, 404);

		const token = await generateToken(user, JWT_SECRET_KEY);

		setCookie(c, COOKIES.USER_ID, user.email);
		await setSignedCookie(c, COOKIES.USER_TOKEN, token, COOkIE_SECRET_KEY);
		return c.json({ data: user }, 201);
	});

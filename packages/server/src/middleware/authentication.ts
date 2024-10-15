import { COOKIES } from "../cookies";
import { createMiddleware } from "hono/factory";
import type { ENV_TYPES } from "../env/zod";
import { getSignedCookie, getCookie } from "hono/cookie";
import { env } from "hono/adapter";
import { decodeToken } from "../jwt_token";

export const authMiddleware = createMiddleware(async (c, next) => {
	const { COOkIE_SECRET_KEY, JWT_SECRET_KEY } = env(c);

	const token = c.req.header("authorization")?.split(" ")[1];

	if (!token) return c.json({ error: "Unauthorized" }, 401);

	const decode = await decodeToken(token, JWT_SECRET_KEY);
	c.set("jwtPayload", decode.jwtPayload);
	c.set("email", decode.email);

	await next();
});

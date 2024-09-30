import { COOKIES } from "../cookies";
import { createMiddleware } from "hono/factory";
import type { ENV_TYPES } from "../env/zod";
import { getSignedCookie, getCookie } from "hono/cookie";
import { env } from "hono/adapter";
import { decodeToken } from "../jwt_token";

export const authMiddleware = createMiddleware(async (c, next) => {
	const { COOkIE_SECRET_KEY, JWT_SECRET_KEY } = env<ENV_TYPES>(c);

	// todo: get from cookies or header
	console.log(`[${c.req.method}] ${c.req.url}`);

	const token = c.req.header("Authorization")?.split(" ")[1];
	// const token = await getSignedCookie(c, COOkIE_SECRET_KEY, COOKIES.USER_TOKEN)
	// const getEmail = getCookie(c, COOKIES.USER_ID)

	//  get from header

	console.log({
		reque: c.req,
	});

	console.log({
		COOkIE_SECRET_KEY,
		JWT_SECRET_KEY,
	});

	console.log({
		token,
		// getEmail
	});

	if (!token) return c.json({ error: "Unauthorized" }, 401);

	const decode = await decodeToken(token, JWT_SECRET_KEY);
	c.set("jwtPayload", decode);
	c.set("email", decode);

	await next();
});

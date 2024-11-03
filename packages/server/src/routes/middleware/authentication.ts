import { createMiddleware } from "hono/factory";
import { env } from "hono/adapter";
import { decodeToken } from "../../jwt_token";
import { safeAwait } from "../../utils/fafeAwait";

export const authMiddleware = createMiddleware(async (c, next) => {
	const { COOkIE_SECRET_KEY, JWT_SECRET_KEY } = env(c);

	const token = c.req.header("authorization")?.split(" ")[1];

	if (!token) return c.json({ error: "Unauthorized" }, 401);

	console.log("token", token);

	const [decoded, error] = await safeAwait(decodeToken(token, JWT_SECRET_KEY));

	if (!decoded || error) return c.json({ error: "Unauthorized" }, 401);

	c.set("jwtPayload", decoded.jwtPayload);
	c.set("email", decoded.email);

	await next();
});

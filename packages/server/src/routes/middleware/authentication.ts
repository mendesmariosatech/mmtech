import { createMiddleware } from "hono/factory";
import { env } from "hono/adapter";
import { decodeToken } from "../../jwt_token";
import { safeAwait } from "../../utils/safeAwait";

export const authMiddleware = createMiddleware(async (c, next) => {
	const { JWT_SECRET_KEY } = env(c);

	const token = c.req.header("authorization")?.split(" ")[1];

	if (!token) return c.json({ error: "Unauthorized" }, 401);

	const decodeResult = await safeAwait(decodeToken(token, JWT_SECRET_KEY));

	if (decodeResult.success === false)
		return c.json({ error: "Unauthorized" }, 401);

	const { authId, businessId, clientId, jwtPayload } = decodeResult.data;

	c.set("jwtPayload", jwtPayload);
	c.set("clientId", clientId);
	c.set("businessId", businessId);
	c.set("authId", authId);

	await next();
});

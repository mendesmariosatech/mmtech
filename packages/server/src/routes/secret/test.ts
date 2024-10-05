import { Hono } from "hono";
import { authMiddleware } from "../../middleware/authentication";

export const secret = new Hono().use("*", authMiddleware).get("/", (c) => {
	const message = c.get("jwtPayload");

	return c.json({ data: `Hello Hono! ${JSON.stringify(message)}` });
});

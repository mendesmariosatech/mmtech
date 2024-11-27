import { createRoute, RouteHandler, z } from "@hono/zod-openapi";
import { setCookie } from "hono/cookie";
import { COOKIES } from "../../env/cookies";
import { AppRouteHandler } from "../../base/type";

export const logoutSpec = createRoute({
	method: "delete",
	path: "/auth/logout",
	tags: ["auth"],
	responses: {
		200: {
			description: "Logout Successful",
			content: {
				"application/json": {
					schema: z.object({
						data: z.literal("Logged out"),
					}),
				},
			},
		},
	},
});

type LogoutRoute = typeof logoutSpec;

export const logoutHandler: AppRouteHandler<LogoutRoute> = async (c) => {
	setCookie(c, COOKIES.USER_ID, "", { maxAge: 0 });
	setCookie(c, COOKIES.USER_TOKEN, "", { maxAge: 0 });
	setCookie(c, COOKIES.BUSINESS_ID, "", { maxAge: 0 });

	return c.json({ data: "Logged out" }, 200);
};

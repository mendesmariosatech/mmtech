import { createRoute, RouteHandler, z } from "@hono/zod-openapi";
import { InsertEventSchema, SelectEventSchema } from "../../drizzle/schema";
import { authMiddleware } from "../middleware/authentication";

export const createEventSpec = createRoute({
	method: "post",
	path: "/calendar/events",
	tags: ["events"],
	middleware: [authMiddleware],
	headers: {
		authorization: {
			description: "Bearer token",
			schema: {
				type: "string",
			},
		},
	},
	request: {
		body: {
			content: {
				"application/json": {
					schema: InsertEventSchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: "Event Created",
			content: {
				"application/json": {
					schema: SelectEventSchema,
				},
			},
		},
		403: {
			description: "Not Authorized",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
		},
	},
});

type CreateEventRoute = typeof createEventSpec;

type Variables = {
	authId: string;
	clientId: string;
	businessId?: string;
};

export const createEventHandler: RouteHandler<
	CreateEventRoute,
	{ Variables: Variables }
> = async (c) => {
	// if the person is not authenticated don't even reach here
	// if the person is not a business customer don't reach here
	const token = c.get("jwtPayload");
	const authId = c.get("authId");
	const clientId = c.get("clientId");
	const businessId = c.get("businessId");

	if (!businessId || !authId || !clientId) {
		return c.json({ error: "Not authorized" }, 403);
	}

	const { title, date } = c.req.valid("json");

	return c.json(
		{
			id: "123",
			title,
			date,
		},
		201,
	);
};

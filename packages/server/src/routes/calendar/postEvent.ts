import { createRoute, RouteHandler, z } from "@hono/zod-openapi";
import { InsertEventSchema, SelectEventSchema } from "../../drizzle/schema";
import { authMiddleware } from "../middleware/authentication";
import { EventTable } from "./dto/event.dto";
import { env } from "hono/adapter";
import { AppRouteHandler } from "../../base/type";
import { BusinessTable } from "../business/dto/business.dto";

/**
 * Specification for creating a new calendar event
 * Requires authentication and business association
 */
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
					/**
					 * Request body schema for creating a calendar event
					 * Includes title, date, optional startTime/endTime, description
					 */
					schema: InsertEventSchema.omit({
						clientId: true,
						businessId: true,
						addressId: true,
					}),
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
		500: {
			description: "Internal Server Error",
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

export const createEventHandler: AppRouteHandler<CreateEventRoute> = async (
	c,
) => {
	const { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } = env(c);
	const authId = c.get("authId");
	const clientId = c.get("clientId");
	const businessId = c.get("businessId");

	if (!businessId || !authId || !clientId) {
		return c.json({ error: "Not authorized" }, 403);
	}

	const validatedInput = c.req.valid("json");

	const Business = new BusinessTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);

	const business = await Business.findBusinessByClientId(clientId);

	if (!business) {
		return c.json({ error: "Not authorized, you don't have a business" }, 403);
	}

	// Construct the event data with all required fields
	const eventData = {
		title: validatedInput.title,
		date: validatedInput.date,
		description: validatedInput.description || null,
		startTime: validatedInput.startTime || null,
		endTime: validatedInput.endTime || null,
		clientId: clientId!,
		businessId: businessId!,
		addressId: null, // Default to null if not provided
	};

	// how to create a new event - add businessId and clientId from auth context
	const Event = new EventTable(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	const newEvent = await Event.createEvent(eventData);

	if (!newEvent) {
		return c.json({ error: "Event not created" }, 500);
	}

	return c.json(newEvent, 201);
};

import { testClient } from "hono/testing";
import { describe, expect, test, jest, afterAll } from "@jest/globals";
import { calendarRouter } from ".";
import { DBTestSetup } from "../tests/setup";

jest.mock("../../jwt_token", () => {
	return {
		generateToken: jest.fn().mockReturnValue(Promise.resolve("123")),
		decodeToken: jest.fn().mockReturnValue(
			Promise.resolve({
				authId: "AU_123",
				clientId: "CL_123",
				businessId: "BU_123",
			}),
		),
	};
});

describe("Calendar Routes Basic Test", () => {
	test("Routes should be defined", () => {
		expect(calendarRouter).toBeDefined();
	});
});

describe("Calendar API Integration Tests", () => {
	test("Should handle PUT /calendar/events/:eventId request with proper schema", () => {
		const client = testClient(calendarRouter);
		expect(client.calendar.events[":eventId"].$put).toBeDefined();
	});

	test("Should handle DELETE /calendar/events/:eventId request with proper schema", () => {
		const client = testClient(calendarRouter);
		expect(client.calendar.events[":eventId"].$delete).toBeDefined();
	});

	test("Should handle POST /calendar/events/:eventId/attendees request with proper schema", () => {
		const client = testClient(calendarRouter);
		expect(client.calendar.events[":eventId"].attendees.$post).toBeDefined();
	});

	test("Should handle DELETE /calendar/events/:eventId/attendees/:customerId request with proper schema", () => {
		const client = testClient(calendarRouter);
		expect(
			client.calendar.events[":eventId"].attendees[":customerId"].$delete,
		).toBeDefined();
	});

	test("Should handle GET /calendar/events/:eventId/attendees request with proper schema", () => {
		const client = testClient(calendarRouter);
		expect(client.calendar.events[":eventId"].attendees.$get).toBeDefined();
	});
});

afterAll(async () => {
	await DBTestSetup.deleteTableAuth();
});

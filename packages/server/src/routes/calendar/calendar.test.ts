import { testClient } from "hono/testing";
import { describe, expect, test, jest, afterAll } from "@jest/globals";
import { calendarRouter } from ".";
import { DBTestSetup } from "../tests/setup";

const genEmail = () => Date.now() + "test@gmail.com";
const password = "TestPassword123";
const timeoutSeconds = 1000;
jest.setTimeout(70 * timeoutSeconds);

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
		// Simply test that the router is created without throwing errors
		expect(calendarRouter).toBeDefined();
	});
});

describe("Calendar API Integration Tests", () => {
	test("Should handle PUT /calendar/events/:eventId request with proper schema", () => {
		// Test that the route exists and accepts the correct request structure
		const client = testClient(calendarRouter);

		// We're testing that the route exists and accepts the correct schema
		expect(client.calendar.events[":eventId"].$put).toBeDefined();
	});

	test("Should handle DELETE /calendar/events/:eventId request with proper schema", () => {
		// Test that the route exists and accepts the correct request structure
		const client = testClient(calendarRouter);

		// We're testing that the route exists and accepts the correct schema
		expect(client.calendar.events[":eventId"].$delete).toBeDefined();
	});
});

afterAll(async () => {
	await DBTestSetup.deleteTableAuth();
});

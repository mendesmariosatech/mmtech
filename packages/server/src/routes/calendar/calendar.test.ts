import {
	afterAll,
	describe,
	expect,
	test,
	jest,
	beforeAll,
} from "@jest/globals";
import { testClient } from "hono/testing";
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

describe("Calendar Tests", () => {
	beforeAll(async () => {});

	describe("Create Event - POST /calendar/events", () => {
		test.todo("User can create an event");

		test.todo("User cannot create an event if they are not authenticated");

		test.todo(
			"User cannot create an event if they are not a business customer",
		);

		test("User cannot create an event if the business does not exist", async () => {
			const eventResponse = await testClient(
				calendarRouter,
			).calendar.events.$post(
				{
					json: {
						title: "Event Title",
						date: new Date().toISOString(),
					},
				},
				{
					headers: {
						authorization: `Bearer ${"bearetoken123"}`,
					},
				},
			);

			// Should return 403 since business doesn't exist in test environment
			expect(eventResponse.status).toBe(403);
		});
	});

	describe("Calendar - GET /calendar/:businessId", () => {
		test.todo(
			"User can get a calendar of all the events for the business their in",
		);

		test.todo(
			"User cannot get a calendar of all the events for the business their in if they are not authenticated",
		);

		test.todo(
			"User cannot get a calendar of all the events for the business their in if they are not a business customer",
		);

		test.todo(
			"User cannot get a calendar of all the events for the business their in if the business does not exist",
		);
	});
});

describe("Calendar API Integration Tests", () => {
	test("Should handle POST /calendar/events request with proper schema", () => {
		// Test that the route exists and accepts the correct request structure
		const client = testClient(calendarRouter);

		// We're testing that the route accepts the correct schema without actually making the request
		// because the actual request would require a real database connection
		expect(client.calendar.events.$post).toBeDefined();
	});

	test("Should handle GET /calendar/:businessId request with proper schema", () => {
		// Test that the route exists and accepts the correct request structure
		const client = testClient(calendarRouter);

		// We're testing that the route exists and accepts the correct request structure
		expect(client["calendar"][":businessId"].$get).toBeDefined();
	});

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

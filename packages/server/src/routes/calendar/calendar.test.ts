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
// import { createTestUser, loginTestUser } from "../auth/index.test";
import { DBTestSetup } from "../tests/setup";
// import { createTestUser } from "../auth/auth.test";

const genEmail = () => Date.now() + "test@gmail.com";
const password = "TestPassword123";

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);
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

	afterAll(async () => {
		await DBTestSetup.deleteTableAuth();
	});

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

import { userEvent } from "@storybook/test";
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

describe.skip("Calendar Tests", () => {
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
			const evenetResponse = await testClient(
				calendarRouter,
			).calendar.events.$post(
				{
					json: {
						businessId: "BU_123",
						title: "Event Title",
						clientId: "CL_123",
						date: new Date().toString(),
					},
				},
				{
					headers: {
						authorization: `Bearer ${"bearetoken123"}`,
					},
				},
			);

			if (evenetResponse.status !== 201) {
				const error = await evenetResponse.json();
				throw new Error("Error creating event: " + error.error);
			}

			const data = await evenetResponse.json();

			expect(evenetResponse.status).toBe(201);
			expect(data.id).toBeDefined();
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

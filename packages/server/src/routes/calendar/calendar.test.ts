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
import { createTestUser } from "../auth/auth.test";

const genEmail = () => Date.now() + "test@gmail.com";
const password = "TestPassword123";

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);
jest.mock("../../jwt_token", () => {
	return {
		generateToken: jest.fn().mockReturnValue(Promise.resolve("123")),
		decodeToken: jest.fn().mockReturnValue(
			Promise.resolve({
				jwtPayload: "Token123",
				email: "email@gmail.com",
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
			const resp = await createTestUser({
				email: genEmail(),
				password,
			});

			// if error throw error
			if (resp.status !== 201) {
				throw new Error("Error creating user");
			}

			const userData = await resp.json();

			// create the user and make sure that user
			// can login and create an evet
			const evenetResponse = await testClient(
				calendarRouter,
			).calendar.events.$post(
				{
					json: {
						business_id: "BU_123",
						title: "Event Title",
						client_creator: userData.data.clientId,
						date: new Date().toString(),
					},
				},
				{
					headers: {
						authorization: `Bearer ${userData.data.token}`,
					},
				},
			);

			if ("error" in evenetResponse) {
				throw new Error("Error creating event");
			}

			const data = await evenetResponse.json();

			expect(evenetResponse.status).toBe(200);
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

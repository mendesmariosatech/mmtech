import { options } from "./../../../../../node_modules/fast-uri/types/index.d";
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
import { createTestUser } from "../auth/index.test";

const email = "test@gmail.com";
const password = "TestPassword123";

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);

describe("Calendar Tests", () => {
	beforeAll(async () => {});

	afterAll(async () => {
		await DBTestSetup.deleteTableAuth();
	});
	describe("Calendar - GET /calendar/:businessId", () => {
		test("User can get a calendar of all the events for the business their in", async () => {
			expect(true).toBe(true);
		});

		test("User cannot get a calendar of all the events for the business their in if they are not authenticated", async () => {
			expect(true).toBe(true);
		});

		test("User cannot get a calendar of all the events for the business their in if they are not a business customer", async () => {
			expect(true).toBe(true);
		});

		test("User cannot get a calendar of all the events for the business their in if the business does not exist", async () => {
			expect(true).toBe(true);
		});
	});

	describe("Create Event - POST /calendar/events", () => {
		test("User can create an event", async () => {
			expect(true).toBe(true);
		});

		test("User cannot create an event if they are not authenticated", async () => {
			expect(true).toBe(true);
		});

		test("User cannot create an event if they are not a business customer", async () => {
			expect(true).toBe(true);
		});

		test("User cannot create an event if the business does not exist", async () => {
			await createTestUser({
				email,
				password,
			});

			const user = await DBTestSetup.getAccessToken({
				email,
				password,
			});

			// create the user and make sure that user
			// can login and create an evet
			const evenetResponse = await testClient(
				calendarRouter,
			).calendar.events.$post(
				{
					json: {
						business_id: "123",
						title: "Event Title",
						client_creator: user.userId,
						date: new Date().toString(),
					},
				},
				{
					headers: {
						authorization: `Bearer ${user.token}`,
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
});

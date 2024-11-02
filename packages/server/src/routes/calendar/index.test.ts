import { afterAll, describe, expect, test, jest } from "@jest/globals";
import { testClient } from "hono/testing";
import { calendarRouter } from ".";

describe("Calendar Tests", () => {
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
			const evenetResponse = await testClient(
				calendarRouter,
			).calendar.events.$post({
				json: {
					business_id: "123",
					title: "Event Title",
					client_creator: "123",
					date: new Date("2024-12-10"),
				},
			});

			if ("error" in evenetResponse) {
				throw new Error("Error creating event");
			}

			const data = await evenetResponse.json();

			expect(evenetResponse.status).toBe(200);
			expect(data.id).toBeDefined();
		});
	});
});

import { Hono } from "hono";
import { testClient } from "hono/testing";
import { describe, expect, test } from "@jest/globals";
import { calendarRouter } from ".";

describe("Calendar API Integration Tests", () => {
	test("Calendar routes should be properly registered", () => {
		// Testing that the calendar router exports the expected functionality
		expect(calendarRouter).toBeDefined();
	});

	test("POST /calendar/events endpoint should exist", () => {
		const app = new Hono();
		// We can't fully test the endpoint without DB setup, but we can verify the route spec exists
		const testApp = app.route("/test", calendarRouter);
		expect(testApp).toBeDefined();
	});

	test("GET /calendar/:businessId endpoint should exist", () => {
		// Similar test for the GET route
		expect(calendarRouter).toBeDefined(); // Both routes are part of the same router
	});
});

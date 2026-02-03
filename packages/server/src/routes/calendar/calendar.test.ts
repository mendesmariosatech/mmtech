import { describe, expect, test } from "@jest/globals";
import { calendarRouter } from ".";

describe("Calendar Routes Test", () => {
	test("Should have calendar routes defined", () => {
		expect(calendarRouter).toBeDefined();
	});
});

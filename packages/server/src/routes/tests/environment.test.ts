import { describe, expect, test } from "@jest/globals";

describe("ENV VARIABLES", () => {
	test("ENV VARIABLES for LANG en_US", () => {
		expect(process.env.LANG).toContain("en_US");
	});

	test("ENV VARIABLES for DATABASE", () => {
		expect(process.env.TURSO_CONNECTION_URL).toBeDefined();
		expect(process.env.TURSO_AUTH_TOKEN).toBeDefined();
	});

	test("ENV for AUTHENTICATION", () => {
		expect(process.env.COOkIE_SECRET_KEY).toBeDefined();
		expect(process.env.JWT_SECRET_KEY).toBeDefined();
	});
});

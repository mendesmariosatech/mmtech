import { describe, expect, test } from "@jest/globals";
import { ENV_VARIABLES } from "@repo/zod-types";

describe("ENV VARIABLES", () => {
	test("ENV VARIABLES for LANG en_US", () => {
		expect(ENV_VARIABLES.LANG).toContain("en_US");
	});

	test("ENV VARIABLES for DATABASE", () => {
		expect(ENV_VARIABLES.TURSO_CONNECTION_URL).toBeDefined();
		expect(ENV_VARIABLES.TURSO_AUTH_TOKEN).toBeDefined();
	});

	test("ENV for AUTHENTICATION", () => {
		expect(ENV_VARIABLES.COOkIE_SECRET_KEY).toBeDefined();
		expect(ENV_VARIABLES.JWT_SECRET_KEY).toBeDefined();
	});
});

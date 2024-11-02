import { jest } from "@jest/globals";

// const SECONDS = 1000;
// jest.setTimeout(70 * SECONDS);
jest.mock("hono/jwt", () => {
	return {
		sign: jest.fn().mockReturnValue(Promise.resolve("MockToken123")),
		decoded: jest.fn().mockReturnValue(
			Promise.resolve({
				jwtPayload: "123",
				email: "email@gmail.com",
			}),
		),
	};
});

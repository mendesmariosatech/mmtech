import { jest } from "@jest/globals";

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);
jest.mock("../../jwt_token", () => {
	return {
		generateToken: jest.fn().mockReturnValue(Promise.resolve("123")),
		decodeToken: jest.fn().mockReturnValue(
			Promise.resolve({
				jwtPayload: "123",
				email: "email@gmail.com",
			}),
		),
	};
});

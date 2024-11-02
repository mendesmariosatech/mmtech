import { afterAll, describe, expect, test, jest } from "@jest/globals";
import { testClient } from "hono/testing";
import { RegisterFields } from "@repo/zod-types";
import { createId } from "@paralleldrive/cuid2";
import { DBTestSetup } from "../tests/setup";
import { authRouter } from ".";

const newUniqueDate = createId();
const testEmail = newUniqueDate + "+validemailtest@email.com";
const testPassword = "12312349090ASAKkdk";

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

describe("New User - POST /auth/register", () => {
	afterAll(async () => {
		await DBTestSetup.deleteTableAuth();
	});
	test("User can register using a new email and valid password and will return the auth token and the user info", async () => {
		const createUserResponse = await createTestUser({});
		const data = await createUserResponse.json();

		if ("error" in data) {
			throw new Error(data.error);
		}
		expect("data" in data).toStrictEqual(true);
		expect(data.data.auth.email).toBe(testEmail);
		expect(data.data.token).toBeDefined();

		const secondResp = await createTestUser({});
		const secondRespData = await secondResp.json();

		expect("error" in secondRespData).toBe(true);
	});

	test("User cannot register with an invalid email format", async () => {
		const response = await createTestUser({ email: "invalid-email" });

		const data = await response.json();
		expect("error" in data).toBe(true);
	});

	test("User cannot register with a password that is too short", async () => {
		const data = await createTestUser({ password: "123" });
		const response = await data.json();

		expect("error" in response).toBe(true);
	});
});

describe("Login - POST /auth/login", () => {
	afterAll(async () => {
		await DBTestSetup.deleteTableAuth();
	});
	test("User can login with valid credentials", async () => {
		const newEmail = newUniqueDate + "alex@gmail.com";
		const password = "123ASDADD";

		const createTestUserResp = await createTestUser({
			email: newEmail,
			password,
		});

		const data = await createTestUserResp.json();

		if ("error" in data) {
			throw new Error(data.error);
		}
		expect("data" in data).toStrictEqual(true);

		const resp = await loginTestUser({
			email: newEmail,
			password,
		});

		const loginResp = await resp.json();

		if ("error" in loginResp) {
			throw new Error(loginResp.error);
		}

		expect("data" in loginResp).toStrictEqual(true);
		expect(loginResp.data.email).toBe(newEmail);
	});

	test("User cannot login with non-existent email", async () => {
		const loginResp = await createTestUser({
			email: "nonexistent@example.com",
			password: "password123",
		});
		const loginData = await loginResp.json();

		expect("error" in loginData).toBe(true);
	});
});

describe("Logout - DELETE /auth/logout", () => {
	afterAll(async () => {
		await DBTestSetup.deleteTableAuth();
	});
	test("User can logout", async () => {
		const newEmail = newUniqueDate + "alex@gmail.com";

		const createTestUserResp = await createTestUser({
			email: newEmail,
		});

		const data = await createTestUserResp.json();

		if ("error" in data) {
			throw new Error(data.error);
		}

		const response = await loginTestUser({
			email: newEmail,
		});

		const loginResp = await response.json();

		if ("error" in loginResp) {
			throw new Error(loginResp.error);
		}

		expect("data" in loginResp).toStrictEqual(true);
		expect(loginResp.data.email).toBe(newEmail);

		const logoutResp = await testClient(authRouter).auth.logout.$delete();

		expect(logoutResp.status).toBe(200);
	});
});

export async function createTestUser({
	email = testEmail,
	password = testPassword,
}: {
	email?: string;
	password?: string;
}) {
	const user: RegisterFields = {
		email,
		password,
		name: "Alex",
		phone: "1233238274347",
		agreeTerms: true,
	};
	const resp = await testClient(authRouter).auth.register.$post({
		json: user,
	});

	return resp;
}

export async function loginTestUser({
	email = testEmail,
	password = testPassword,
}: {
	email?: string;
	password?: string;
}) {
	const resp = await testClient(authRouter).auth.login.$post({
		json: {
			email,
			password,
		},
	});

	return resp;
}

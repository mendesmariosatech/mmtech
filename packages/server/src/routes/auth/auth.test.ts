import { afterAll, describe, expect, test, jest } from "@jest/globals";
import { testClient } from "hono/testing";
import { authRoute } from "./auth";
import { RegisterFields } from "@repo/zod-types";
import { createId } from "@paralleldrive/cuid2";
import { deleteDB } from "../tests/setup";
import { JWTPayload } from "hono/utils/jwt/types";

const newUniqueDate = createId();
const testEmail = newUniqueDate + "validemailtest@email.com";
const testPassword = "12312349090ASAKkdk";

jest.mock("../../jwt_token", () => {
	return {
		generateToken: jest.fn().mockReturnValue(Promise.resolve("string")),
		decodeToken: jest.fn().mockReturnValue(
			Promise.resolve({
				jwtPayload: "123",
				email: "email@gmail.com",
			}),
		),
	};
});

describe.skip("New User - POST /auth/register", () => {
	afterAll(async () => {
		await deleteDB.deleteTableAuth();
	});
	test("User can register using a new email and valid password and will return the auth token and the user info", async () => {
		const data = await createTestUser({});

		console.log({
			data,
		});

		if ("error" in data) {
			throw new Error(data.error);
		}
		expect("data" in data).toStrictEqual(true);
		expect(data.data.auth.email).toBe(testEmail);
		expect(data.data.token).toBe("123");

		const secondResp = await createTestUser({});
		expect("error" in secondResp).toBe(true);
	});

	test("User cannot register with an invalid email format", async () => {
		const data = await createTestUser({ email: "invalid-email" });
		expect("error" in data).toBe(true);
	});

	test("User cannot register with a password that is too short", async () => {
		const data = await createTestUser({ password: "123" });
		expect("error" in data).toBe(true);
	});
});

describe("Login - POST /auth/login", () => {
	afterAll(async () => {
		await deleteDB.deleteTableAuth();
	});
	test.skip("User can login with valid credentials", async () => {
		const newEmail = newUniqueDate + "alex@gmail.com";
		const password = "123ASDADD";

		const data = await createTestUser({
			email: newEmail,
			password,
		});

		if ("error" in data) {
			throw new Error(data.error);
		}
		expect("data" in data).toStrictEqual(true);

		const loginResp = await loginTestUser({
			email: newEmail,
			password,
		});

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
		expect("error" in loginResp).toBe(true);
	});
});

async function createTestUser({
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
	const resp = await testClient(authRoute).register.$post({
		json: user,
	});

	return resp.json();
}

async function loginTestUser({
	email = testEmail,
	password = testPassword,
}: {
	email?: string;
	password?: string;
}) {
	const resp = await testClient(authRoute).login.$post({
		json: {
			email,
			password,
		},
	});

	return resp.json();
}

import { describe, expect, test } from "@jest/globals";
import { testClient } from "hono/testing";
import { authRoute } from "./register";
import { RegisterFields } from "@repo/zod-types";
import { createId } from "@paralleldrive/cuid2";

const sum = (a: number, b: number) => {
	return a + b;
};

const newUniquedate = createId();
const email = newUniquedate + "validemailtest@email.com";

const createTestUser = async () => {
	const user: RegisterFields = {
		name: "Alex",
		email,
		phone: "1233238274347",
		password: "12312349090ASAKkdk",
		agreeTerms: true,
	};
	const resp = await testClient(authRoute).register.$post({
		json: user,
	});

	return resp.json();
};

describe("New User - POST /auth/register", () => {
	test("User can SignUp using a new email and valid password, nut cannot create another account with same email", async () => {
		const data = await createTestUser();

		if ("error" in data) {
			throw new Error(data.error);
		}
		expect("data" in data).toStrictEqual(true);
		expect(data.data.newUser.email).toBe(email);

		const secondResp = await createTestUser();
		expect("error" in secondResp).toBe(true);
	});
	test.todo("User cannot Signup with a wrong email or password");
});

describe.skip("Login - POST /auth/login", () => {
	test("User can SignUp using a new email and valid password, nut cannot create another account with same email", async () => {
		const data = await createTestUser();

		if ("error" in data) {
			throw new Error(data.error);
		}
		expect("data" in data).toStrictEqual(true);
		expect(data.data.newUser.email).toBe(email);

		const secondResp = await createTestUser();
		expect("error" in secondResp).toBe(true);
	});
	test.todo("User cannot Signup with a wrong email or password");
});

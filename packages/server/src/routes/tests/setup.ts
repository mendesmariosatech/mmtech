import { testClient } from "hono/testing";
import { DBConnection } from "../../drizzle/drizzle-client";
import { authTable } from "../../drizzle/schema";
import { authRouter } from "../auth";
// import { loginTestUser } from "../auth/index.test";

const dbConnection = new DBConnection(
	process.env.TURSO_CONNECTION_URL,
	process.env.TURSO_AUTH_TOKEN,
);

type Cache = {
	USER_ID: string;
	USER_TOKEN: string;
};

type Keys = keyof Cache;

export const DBTestSetup = {
	userCache: new Map<Keys, string>(),
	async deleteTableAuth() {
		await dbConnection.db.delete(authTable);
	},

	async createTestUser({
		email = "test@gmail.com",
		password = "TestPassword123",
	}) {
		const user = {
			email,
			password,
			name: "Alex",
			phone: "1233238274347",
			agreeTerms: true,
		} as const;

		const resp = await testClient(authRouter).auth.register.$post({
			json: user,
		});

		if (resp.status !== 201) {
			const data = await resp.json();
			throw new Error(data.error);
		}

		const data = await resp.json();

		this.userCache.set("USER_ID", data.data.clientId);
		this.userCache.set("USER_TOKEN", data.data.token);
		return resp;
	},

	async getAccessToken({
		email = "test@gmail.com",
		password = "TestPassword123",
	}) {
		// cache the token so we can use it for the logout test
		// if we have the token we don't need to login again
		const foundToken = this.userCache.get("USER_TOKEN");
		const foundUserId = this.userCache.get("USER_ID");
		if (foundToken && foundUserId) {
			return {
				token: foundToken,
				userId: foundUserId,
			};
		}

		const resp = await testClient(authRouter).auth.login.$post({
			json: {
				email,
				password,
			},
		});

		if (resp.status !== 200) {
			const data = await resp.json();
			throw new Error(data.error);
		}

		const data = await resp.json();
		const userId = data.data.id;
		const token = data.data.token;

		this.userCache.set("USER_ID", userId);
		this.userCache.set("USER_TOKEN", token);

		return { token, userId };
	},
};

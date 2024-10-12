import { DBConnection } from "../../../drizzle/drizzle-client";
import { authTable, type SelectAuth } from "../../../drizzle/schema";
import { eq } from "drizzle-orm";

export class AuthTable extends DBConnection {
	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		super(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}

	public async registerUser(
		email: SelectAuth["email"],
		passwordDigest: string,
	) {
		const [user] = await this.db
			.insert(authTable)
			.values({
				email,
				passwordDigest,
			})
			.returning();

		return user;
	}

	public async findUser(email: SelectAuth["email"]) {
		const [user] = await this.db
			.select()
			.from(authTable)
			.where(eq(authTable.email, email));
		return user;
	}

	public async deleteTable() {
		await this.db.delete(authTable);
	}
}

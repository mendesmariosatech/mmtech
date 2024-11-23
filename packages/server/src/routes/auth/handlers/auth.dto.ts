import { DBConnection } from "../../../drizzle/drizzle-client";
import {
	authTable,
	SelectAuth,
	type InsertAuth,
} from "../../../drizzle/schema";
import { eq } from "drizzle-orm";

export class AuthTable extends DBConnection {
	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		super(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}

	public async registerAuthUser(args: InsertAuth) {
		const [user] = await this.db
			.insert(authTable)
			.values({
				email: args.email,
				password: args.password,
				name: args.name,
				phone: args.phone,
				agreeTems: args.agreeTems,
			})
			.returning();

		return user;
	}

	public async findAuthUser(email: SelectAuth["email"]) {
		const [user] = await this.db
			.select()
			.from(authTable)
			.where(eq(authTable.email, email));
		return user;
	}

	private async deleteTable() {
		await this.db.delete(authTable);
	}
}

import { DBConnection } from "../../../drizzle/drizzle-client";
import { clientTable, InsertClient } from "../../../drizzle/schema";

export class ClientTable extends DBConnection {
	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		super(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}

	public async createNewClient(args: InsertClient) {
		const [created] = await this.db
			.insert(clientTable)
			.values({
				authId: args.authId,
			})
			.returning();

		return created;
	}
}

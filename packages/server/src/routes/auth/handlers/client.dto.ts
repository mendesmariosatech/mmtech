import { DBConnection } from "../../../drizzle/drizzle-client";
import {
	clientTable,
	InsertClient,
	SelectClient,
} from "../../../drizzle/schema";

type ErrorOrNot<T> = [null, Error] | [T, null];

export class ClientTable extends DBConnection {
	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		super(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}

	public async createNewClient(
		args: InsertClient,
	): Promise<ErrorOrNot<SelectClient>> {
		const [created] = await this.db
			.insert(clientTable)
			.values({
				authId: args.authId,
			})
			.returning();

		if (!created) return [null, new Error("Failed to create new client")];

		return [created, null];
	}
}

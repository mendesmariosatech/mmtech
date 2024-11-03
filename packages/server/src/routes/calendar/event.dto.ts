import { DBConnection } from "../../drizzle/drizzle-client";
import { eventTable, InsertEvent } from "../../drizzle/schema";

export class EventTable extends DBConnection {
	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		super(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}

	public async createEvent(args: InsertEvent) {
		const [event] = await this.db
			.insert(eventTable)
			.values({
				date: args.date,
				time: args.time,
				title: args.title,
				business_id: args.business_id,
				client_creator: args.client_creator,
			})
			.returning();

		return event;
	}
}

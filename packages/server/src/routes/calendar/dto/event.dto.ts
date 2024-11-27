import { DBConnection } from "../../../drizzle/drizzle-client";
import { eventTable, InsertEvent } from "../../../drizzle/schema";

export class EventTable extends DBConnection {
	public async createEvent(args: InsertEvent) {
		const [event] = await this.db.insert(eventTable).values(args).returning();

		return event;
	}
}

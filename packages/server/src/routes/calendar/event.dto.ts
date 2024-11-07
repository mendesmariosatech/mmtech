import { and, between, eq, gte, lte } from "drizzle-orm";
import { DBConnection } from "../../drizzle/drizzle-client";
import { eventTable, InsertEvent } from "../../drizzle/schema";

export class EventTable extends DBConnection {
	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		super(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}

	public async getEvents() {
		const events = await this.db
			.select()
			.from(eventTable)
			.where(
				and(
					eq(eventTable.businessId, "BU_123"),
					lte(eventTable.date, 1689408000000),
					gte(eventTable.date, 1689408000000),
					eq(eventTable.clientId, "CL_123"),
				),
			);
		return events;
	}

	public async createEvent(args: InsertEvent) {
		const [event] = await this.db.insert(eventTable).values(args).returning();

		return event;
	}
}

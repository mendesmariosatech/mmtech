import { eq } from "drizzle-orm";
import { DBConnection } from "../../../drizzle/drizzle-client";
import { eventTable, InsertEvent } from "../../../drizzle/schema";

/**
 * Data Transfer Object for handling calendar event operations
 * Provides methods for creating and retrieving calendar events
 */
export class EventTable extends DBConnection {
	/**
	 * Creates a new calendar event in the database
	 * @param args Event data to insert, following the InsertEvent schema
	 * @returns The created event object
	 */
	public async createEvent(args: InsertEvent) {
		const [event] = await this.db.insert(eventTable).values(args).returning();

		return event;
	}

	/**
	 * Retrieves all calendar events for a specific business
	 * @param businessId The ID of the business to retrieve events for
	 * @returns Array of events belonging to the specified business
	 */
	public async getEventsByBusinessId(businessId: string) {
		const events = await this.db
			.select()
			.from(eventTable)
			.where(eq(eventTable.businessId, businessId));

		return events;
	}
}

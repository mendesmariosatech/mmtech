import { eq } from "drizzle-orm";
import { DBConnection } from "../../../drizzle/drizzle-client";
import { eventTable, InsertEvent } from "../../../drizzle/schema";

/**
 * Data Transfer Object for handling calendar event operations
 * Provides methods for creating, retrieving, updating and deleting calendar events
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

	/**
	 * Retrieves a specific event by ID
	 * @param eventId The ID of the event to retrieve
	 * @returns The event object if found, null otherwise
	 */
	public async getEventById(eventId: string) {
		const [event] = await this.db
			.select()
			.from(eventTable)
			.where(eq(eventTable.id, eventId));

		return event || null;
	}

	/**
	 * Updates an existing calendar event
	 * @param eventId The ID of the event to update
	 * @param args Updated event data
	 * @returns The updated event object
	 */
	public async updateEvent(eventId: string, args: Partial<InsertEvent>) {
		const [event] = await this.db
			.update(eventTable)
			.set({
				...args,
				// updatedAt is handled automatically by the schema's $onUpdate
			})
			.where(eq(eventTable.id, eventId))
			.returning();

		return event;
	}

	/**
	 * Deletes a calendar event by ID
	 * @param eventId The ID of the event to delete
	 * @returns Boolean indicating success or failure
	 */
	public async deleteEvent(eventId: string) {
		const result = await this.db
			.delete(eventTable)
			.where(eq(eventTable.id, eventId))
			.returning();

		return result.length > 0;
	}
}

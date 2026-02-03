import { eq, and } from "drizzle-orm";
import { DBConnection } from "../../../drizzle/drizzle-client";
import { customerAttendeeTable, customer } from "../../../drizzle/schema";

/**
 * Data Transfer Object for handling calendar event attendee operations
 * Provides methods for adding, removing and retrieving attendees for calendar events
 */
export class AttendeeTable extends DBConnection {
	/**
	 * Adds a customer as an attendee to a calendar event
	 * @param customerId The ID of the customer to add as attendee
	 * @param eventId The ID of the event to add the attendee to
	 * @returns The created attendee record
	 */
	public async addAttendee(customerId: string, eventId: string) {
		const [attendee] = await this.db
			.insert(customerAttendeeTable)
			.values({
				customerId,
				eventId,
			})
			.returning();

		return attendee;
	}

	/**
	 * Removes a customer from event attendees
	 * @param customerId The ID of the customer to remove from attendees
	 * @param eventId The ID of the event to remove the attendee from
	 * @returns Boolean indicating success or failure
	 */
	public async removeAttendee(customerId: string, eventId: string) {
		const result = await this.db
			.delete(customerAttendeeTable)
			.where(
				and(
					eq(customerAttendeeTable.customerId, customerId),
					eq(customerAttendeeTable.eventId, eventId),
				),
			)
			.returning();

		return result.length > 0;
	}

	/**
	 * Gets all attendees for a specific event
	 * @param eventId The ID of the event to retrieve attendees for
	 * @returns Array of customers attending the specified event
	 */
	public async getAttendeesByEventId(eventId: string) {
		const attendees = await this.db
			.select()
			.from(customerAttendeeTable)
			.innerJoin(customer, eq(customer.id, customerAttendeeTable.customerId))
			.where(eq(customerAttendeeTable.eventId, eventId));

		return attendees;
	}

	/**
	 * Checks if a customer is attending a specific event
	 * @param customerId The ID of the customer to check
	 * @param eventId The ID of the event to check
	 * @returns Boolean indicating if the customer is attending the event
	 */
	public async isCustomerAttendingEvent(customerId: string, eventId: string) {
		const [attendee] = await this.db
			.select()
			.from(customerAttendeeTable)
			.where(
				and(
					eq(customerAttendeeTable.customerId, customerId),
					eq(customerAttendeeTable.eventId, eventId),
				),
			);

		return !!attendee;
	}
}

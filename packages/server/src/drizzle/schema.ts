import { createId } from "@paralleldrive/cuid2";
import { name, relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";

const Initial = z.string().min(2).max(2).toUpperCase();
const genEntityId = (initials: string) =>
	`${Initial.parse(initials)}_${createId().toUpperCase()}`;

export const authTable = sqliteTable("auth", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("AU"))
		.primaryKey(),
	name: text("name").notNull(),
	passwordDigest: text("password_digest").notNull(),
	email: text("email").unique().notNull(),
	phone: text("phone"),
	emailConfirmedAt: integer("email_confirmed_at", { mode: "timestamp" }),
	deletedAt: integer("deleted_at", { mode: "timestamp" }),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export type InsertAuth = typeof authTable.$inferInsert;
export type SelectAuth = typeof authTable.$inferSelect;

export const clientTable = sqliteTable("client", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("CL"))
		.primaryKey(),
	authId: text("auth_id")
		.references(() => authTable.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const clientRelations = relations(clientTable, ({ one }) => ({
	auth: one(authTable, {
		fields: [clientTable.authId],
		references: [authTable.id],
	}),
}));

export type InsertClient = typeof clientTable.$inferInsert;
export type SelectClient = typeof clientTable.$inferSelect;

export const customer = sqliteTable("customer", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("CU"))
		.primaryKey(),
	authId: text("auth_id").references(() => authTable.id, {
		onDelete: "cascade",
	}),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const customerRelations = relations(customer, ({ one }) => ({
	auth: one(authTable, {
		fields: [customer.authId],
		references: [authTable.id],
	}),
}));

export const businessTable = sqliteTable("business", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("BS"))
		.primaryKey(),
	clientId: text("client_id")
		.references(() => clientTable.id, { onDelete: "cascade" })
		.notNull(),
	name: text("name").notNull(),
	addressId: text("address_id").references(() => addressTable.id, {
		onDelete: "cascade",
	}),
	description: text("description"),
	createdAt: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const businessRelations = relations(businessTable, ({ one }) => ({
	client: one(clientTable, {
		fields: [businessTable.clientId],
		references: [clientTable.id],
	}),
}));

export const eventTable = sqliteTable("event", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("EV"))
		.primaryKey(),
	clientId: text("client_id")
		.references(() => clientTable.id, { onDelete: "cascade" })
		.notNull(),
	business_id: text("business_id")
		.references(() => businessTable.id, { onDelete: "cascade" })
		.notNull(),
	addressId: text("address_id").references(() => addressTable.id, {
		onDelete: "cascade",
	}),
	title: text("title").notNull(),
	description: text("description"),
	date: integer("date").notNull(),
	time: integer("time"),
	location: text("location"),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const eventRelations = relations(eventTable, ({ one }) => ({
	client: one(clientTable, {
		fields: [eventTable.clientId],
		references: [clientTable.id],
	}),
	business: one(businessTable, {
		fields: [eventTable.business_id],
		references: [businessTable.id],
	}),
	address: one(addressTable, {
		fields: [eventTable.addressId],
		references: [addressTable.id],
	}),
}));

export const customerAttendeeTable = sqliteTable("customer_attendee", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("CA"))
		.primaryKey(),
	customerId: text("customer_id")
		.references(() => customer.id, { onDelete: "cascade" })
		.notNull(),
	eventId: text("event_id")
		.references(() => eventTable.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const customerAttendeeRelations = relations(
	customerAttendeeTable,
	({ one }) => ({
		customer: one(customer, {
			fields: [customerAttendeeTable.customerId],
			references: [customer.id],
		}),
		event: one(eventTable, {
			fields: [customerAttendeeTable.eventId],
			references: [eventTable.id],
		}),
	}),
);

export const businessCustomers = sqliteTable("business_customers", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("BC"))
		.primaryKey(),
	businessId: text("business_id")
		.references(() => businessTable.id, { onDelete: "cascade" })
		.notNull(),
	customerId: text("customer_id")
		.references(() => customer.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const businessCustomersRelations = relations(
	businessCustomers,
	({ one }) => ({
		business: one(businessTable, {
			fields: [businessCustomers.businessId],
			references: [businessTable.id],
		}),
		customer: one(customer, {
			fields: [businessCustomers.customerId],
			references: [customer.id],
		}),
	}),
);

export const addressTable = sqliteTable("address", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("AD"))
		.primaryKey(),
	streetAddress: text("street_address").notNull(),
	complement: text("complement"),
	stateOrProvince: text("state_or_province").notNull(),
	city: text("city").notNull(),
	postalCode: text("postal_code").notNull(),
	country: text("country").notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const addressRelations = relations(addressTable, ({ one }) => ({
	businesses: one(businessTable, {
		fields: [addressTable.id],
		references: [businessTable.addressId],
	}),
	events: one(eventTable, {
		fields: [addressTable.id],
		references: [eventTable.addressId],
	}),
}));

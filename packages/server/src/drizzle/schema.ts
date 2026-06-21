import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { genEntityId } from "./utils";
import { videosTable } from "./videos/videos";

export { videosTable } from "./videos/videos";
export {
	templateTable,
	templateRelations,
} from "./landing-page/template/template";

export {
	pageTable,
	pageRelations,
	componentPage,
	componentPageRelations,
} from "./landing-page/page/page";
export { componentTable } from "./landing-page/component/component";

export {
	planMaster,
	planMasterTasks,
} from "./tasks/master-plan";

export const authTable = sqliteTable("auth", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("AU"))
		.primaryKey(),
	name: text("name").notNull(),
	password: text("password").notNull(),
	email: text("email").unique().notNull(),
	phone: text("phone"),
	emailConfirmedAt: integer("email_confirmed_at", { mode: "timestamp" }),
	deletedAt: integer("deleted_at", { mode: "timestamp" }),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const RegisterFields = createInsertSchema(authTable).pick({
	name: true,
	email: true,
	password: true,
	phone: true,
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
		.primaryKey()
		.notNull(),
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

export const CreateBusinessSchema = createInsertSchema(businessTable).pick({
	name: true,
	clientId: true,
	description: true,
});

export const CreateBusinessInput = CreateBusinessSchema.omit({
	clientId: true,
});

const SelectedSchema = createSelectSchema(businessTable).pick({
	clientId: true,
});

export type CreateBusinessSchema = z.infer<typeof CreateBusinessSchema>;

export const GetBusinessSchema = createSelectSchema(businessTable).pick({
	name: true,
	id: true,
});

export type CreateBusiness = z.infer<typeof CreateBusinessSchema>;

export const businessRelations = relations(businessTable, ({ one, many }) => ({
	client: one(clientTable, {
		fields: [businessTable.clientId],
		references: [clientTable.id],
	}),
	videos: many(videosTable),
}));

export const eventTable = sqliteTable("event", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("EV"))
		.primaryKey(),
	clientId: text("client_id")
		.references(() => clientTable.id, { onDelete: "cascade" })
		.notNull(),
	businessId: text("business_id")
		.references(() => businessTable.id, { onDelete: "cascade" })
		.notNull(),
	addressId: text("address_id").references(() => addressTable.id, {
		onDelete: "cascade",
	}),
	title: text("title").notNull(),
	description: text("description"),
	date: integer("date", { mode: "timestamp" }).notNull(),
	startTime: integer("startTime", { mode: "timestamp" }),
	endTime: integer("endTime", { mode: "timestamp" }),
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
		fields: [eventTable.businessId],
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
	createdAt: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
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
	createdAt: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const SelectEventSchema = createSelectSchema(eventTable).pick({
	id: true,
	title: true,
});

const StringToDate = z.string().transform((date) => new Date(date));
const OptionalStringToDate = StringToDate.nullable().optional();

export const InsertEventSchema = createInsertSchema(eventTable, {
	date: StringToDate,
	startTime: OptionalStringToDate,
	endTime: OptionalStringToDate,
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export type InsertEvent = typeof eventTable.$inferInsert;

// Dog Walking Tables
export const dogWalkingCompanies = sqliteTable("dog_walking_companies", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("DC"))
		.primaryKey(),
	owner_id: text("owner_id")
		.references(() => authTable.id, { onDelete: "cascade" })
		.notNull(),
	name: text("name").notNull(),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const dogWalkingEmployees = sqliteTable("dog_walking_employees", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("DE"))
		.primaryKey(),
	user_id: text("user_id").references(() => authTable.id, {
		onDelete: "set null",
	}),
	company_id: text("company_id")
		.references(() => dogWalkingCompanies.id, { onDelete: "cascade" })
		.notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	phone: text("phone"),
	hourly_rate: integer("hourly_rate").notNull(),
	is_active: integer("is_active", { mode: "boolean" }).default(true).notNull(),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const dogWalkingClients = sqliteTable("dog_walking_clients", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("DW"))
		.primaryKey(),
	company_id: text("company_id")
		.references(() => dogWalkingCompanies.id, { onDelete: "cascade" })
		.notNull(),
	name: text("name").notNull(),
	email: text("email"),
	phone: text("phone"),
	address: text("address"),
	dog_name: text("dog_name").notNull(),
	dog_breed: text("dog_breed"),
	dog_notes: text("dog_notes"),
	walk_rate: integer("walk_rate").notNull(),
	is_active: integer("is_active", { mode: "boolean" }).default(true).notNull(),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const dogWalkingWalks = sqliteTable("dog_walking_walks", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("DWK"))
		.primaryKey(),
	company_id: text("company_id")
		.references(() => dogWalkingCompanies.id, { onDelete: "cascade" })
		.notNull(),
	client_id: text("client_id")
		.references(() => dogWalkingClients.id, { onDelete: "cascade" })
		.notNull(),
	employee_id: text("employee_id")
		.references(() => dogWalkingEmployees.id, { onDelete: "cascade" })
		.notNull(),
	started_at: text("started_at").notNull(),
	ended_at: text("ended_at"),
	duration_minutes: integer("duration_minutes"),
	notes: text("notes"),
	status: text("status", { enum: ["in_progress", "completed", "cancelled"] })
		.default("in_progress")
		.notNull(),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const dogWalkingInvoices = sqliteTable("dog_walking_invoices", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("DI"))
		.primaryKey(),
	company_id: text("company_id")
		.references(() => dogWalkingCompanies.id, { onDelete: "cascade" })
		.notNull(),
	client_id: text("client_id")
		.references(() => dogWalkingClients.id, { onDelete: "cascade" })
		.notNull(),
	invoice_number: text("invoice_number").notNull().unique(),
	period_start: text("period_start").notNull(),
	period_end: text("period_end").notNull(),
	total_walks: integer("total_walks").notNull(),
	total_amount: integer("total_amount").notNull(),
	status: text("status", { enum: ["draft", "sent", "paid"] })
		.default("draft")
		.notNull(),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

// Dog Walking Relations
export const dogWalkingCompanyRelations = relations(
	dogWalkingCompanies,
	({ one, many }) => ({
		owner: one(authTable, {
			fields: [dogWalkingCompanies.owner_id],
			references: [authTable.id],
		}),
		employees: many(dogWalkingEmployees),
		clients: many(dogWalkingClients),
		walks: many(dogWalkingWalks),
		invoices: many(dogWalkingInvoices),
	}),
);

export const dogWalkingEmployeeRelations = relations(
	dogWalkingEmployees,
	({ one, many }) => ({
		user: one(authTable, {
			fields: [dogWalkingEmployees.user_id],
			references: [authTable.id],
		}),
		company: one(dogWalkingCompanies, {
			fields: [dogWalkingEmployees.company_id],
			references: [dogWalkingCompanies.id],
		}),
		walks: many(dogWalkingWalks),
	}),
);

export const dogWalkingClientRelations = relations(
	dogWalkingClients,
	({ one, many }) => ({
		company: one(dogWalkingCompanies, {
			fields: [dogWalkingClients.company_id],
			references: [dogWalkingCompanies.id],
		}),
		walks: many(dogWalkingWalks),
		invoices: many(dogWalkingInvoices),
	}),
);

export const dogWalkingWalkRelations = relations(
	dogWalkingWalks,
	({ one }) => ({
		company: one(dogWalkingCompanies, {
			fields: [dogWalkingWalks.company_id],
			references: [dogWalkingCompanies.id],
		}),
		client: one(dogWalkingClients, {
			fields: [dogWalkingWalks.client_id],
			references: [dogWalkingClients.id],
		}),
		employee: one(dogWalkingEmployees, {
			fields: [dogWalkingWalks.employee_id],
			references: [dogWalkingEmployees.id],
		}),
	}),
);

export const dogWalkingInvoiceRelations = relations(
	dogWalkingInvoices,
	({ one }) => ({
		company: one(dogWalkingCompanies, {
			fields: [dogWalkingInvoices.company_id],
			references: [dogWalkingCompanies.id],
		}),
		client: one(dogWalkingClients, {
			fields: [dogWalkingInvoices.client_id],
			references: [dogWalkingClients.id],
		}),
	}),
);

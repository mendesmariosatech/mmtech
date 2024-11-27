import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { genEntityId } from "../utils";
import { addressTable, clientTable } from "../schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { videosTable } from "../Video/videos";

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
	slug: text("slug").unique(),
	description: text("description"),
	//  IDK if I keep thi or use new Date()
	createdAt: integer("created_at", { mode: "timestamp" })
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const CreateBusinessSchema = createInsertSchema(businessTable).pick({
	name: true,
	clientId: true,
	description: true,
	slug: true,
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

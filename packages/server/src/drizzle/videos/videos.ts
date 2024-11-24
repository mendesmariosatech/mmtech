import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { genEntityId } from "../utils";
import { businessTable } from "../schema";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const videosTable = sqliteTable("videos", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("VD"))
		.primaryKey(),
	businessId: text("business_id")
		.notNull()
		.references(() => businessTable.id, { onDelete: "cascade" }),
	title: text("title").notNull(),
	url: text("url").notNull().notNull(),
	description: text("description"),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const videoRelations = relations(videosTable, ({ one }) => ({
	business: one(businessTable, {
		fields: [videosTable.businessId],
		references: [businessTable.id],
	}),
}));

export const CreateVideoSchema = createInsertSchema(videosTable)
	.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
	})
	.extend({
		url: z.string().url(),
	});

export type CreateVideoSchema = z.infer<typeof CreateVideoSchema>;

export const SelectVideoSchema = createSelectSchema(videosTable);
export type SelectVideoSchema = z.infer<typeof SelectVideoSchema>;

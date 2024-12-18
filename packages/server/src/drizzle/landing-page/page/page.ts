import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { genEntityId } from "../../utils";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { templateTable } from "../template/template";
import { relations } from "drizzle-orm";

export const pageTable = sqliteTable("landing_page.page", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("PG"))
		.primaryKey(),
	name: text("name").notNull(),
	templateId: text("template_id")
		.notNull()
		.references(() => templateTable.id, { onDelete: "cascade" }),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const pageRelations = relations(pageTable, ({ one }) => ({
	template: one(templateTable, {
		fields: [pageTable.templateId],
		references: [templateTable.id],
	}),
}));

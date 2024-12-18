import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { genEntityId } from "../utils";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const templateTable = sqliteTable("landing_page.template", {
	id: text("id", { length: 128 })
		.$defaultFn(() => genEntityId("TP"))
		.primaryKey(),
	name: text("name").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const CreateTemplateSchema = createInsertSchema(templateTable).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export type CreateTemplateSchema = z.infer<typeof CreateTemplateSchema>;

export const SelectTemplateSchema = createSelectSchema(templateTable);

export type SelectTemplateSchema = z.infer<typeof SelectTemplateSchema>;

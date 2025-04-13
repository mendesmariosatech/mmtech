import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { genEntityId } from "../../utils";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { templateTable } from "../template/template";
import { relations } from "drizzle-orm";
import { componentTable } from "../component/component";

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

export const componentPage = sqliteTable(
	"component_page",
	{
		// TODO typar esse schema
		id: integer("id").primaryKey(),
		componentId: integer("component_id").references(() => componentTable.id),
		pageId: integer("page_id").references(() => pageTable.id),
		order: integer("order").notNull(), // For sorting components in page
		cssOverrides: text("css_override", { mode: "json" }), // Overridden CSS properties
		contentOverrides: text("content_override", { mode: "json" }), // Overridden content
	},
	(table) => ({
		pageComponentIdx: index("page_component_idx").on(
			table.pageId,
			table.componentId,
		),
	}),
);

const SelectComponentPageSchema = createSelectSchema(componentPage).pick({
	id: true,
});

export type SelectComponentPageSchema = z.infer<
	typeof SelectComponentPageSchema
>;

export const pageRelations = relations(pageTable, ({ one, many }) => ({
	template: one(templateTable, {
		fields: [pageTable.templateId],
		references: [templateTable.id],
	}),
	components: many(componentTable),
}));

export const CreatePageSchema = createInsertSchema(pageTable).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export type CreatePageSchema = z.infer<typeof CreatePageSchema>;

export const SelectPageSchema = createSelectSchema(pageTable);

export type SelectPageSchema = z.infer<typeof SelectPageSchema>;

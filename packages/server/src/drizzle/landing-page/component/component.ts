import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const componentTypes = ["text", "image", "video", "button", "block"] as const;

export const CssSchema = z.object({
	color: z.string().optional(),
	fontSize: z.string().optional(),
	backgroundColor: z.string().optional(),
	padding: z.string().optional(),
	margin: z.string().optional(),
	width: z.string().optional(),
	height: z.string().optional(),
	opacity: z.string().optional(),
	border: z.string().optional(),
});

export const ContentSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("text"),
		text: z.string(),
	}),
	z.object({
		type: z.literal("image"),
		url: z.string(),
		alt: z.string().optional(),
	}),
	z.object({
		type: z.literal("video"),
		url: z.string(),
	}),
	z.object({
		type: z.literal("button"),
		text: z.string(),
		url: z.string(),
	}),
	z.object({
		type: z.literal("block"),
		children: z.array(z.object({ id: z.number() })),
	}),
]);

type ContentSchema = z.infer<typeof ContentSchema>;

type CssSchema = z.infer<typeof CssSchema>;

export const componentTable = sqliteTable("landing_page.components", {
	id: integer("id").primaryKey(),
	type: text("type", { enum: componentTypes }).notNull(),
	content: text("content", { mode: "json" }).$type<ContentSchema>().notNull(),
	css: text("css", { mode: "json" }).$type<CssSchema>().notNull(),
	createdAt: integer("created_at", { mode: "timestamp" })
		.default(new Date())
		.notNull(),
});

export const GetComponentSchema = createSelectSchema(componentTable);
export const GetMergedSchema = z.object({
	...GetComponentSchema.shape,
	content: ContentSchema,
	css: CssSchema,
});
export type GetMergedSchema = z.infer<typeof GetMergedSchema>;

export const CreateComponentSchema = createInsertSchema(componentTable).omit({
	id: true,
	createdAt: true,
});

export const CreateMergeComponentSchema = z.object({
	...CreateComponentSchema.shape,
	content: ContentSchema,
	css: CssSchema,
});

export type CreateMergeComponentSchema = z.infer<
	typeof CreateMergeComponentSchema
>;

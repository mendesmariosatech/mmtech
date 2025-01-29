import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

const componentTypes = ["text", "image", "video", "button", "block"] as const;

export const componentTable = sqliteTable(
	"landing_page.components",
	{
		id: integer("id").primaryKey(),
		type: text("type", { enum: componentTypes }).notNull(),
		content: text("content", { mode: "json" }).$type<{
			text?: string;
			url?: string;
		}>(),
		css: text("css", { mode: "json" })
			.$type<{
				color?: string;
				fontSize?: string;
				backgroundColor?: string;
				padding?: string;
				margin?: string;
				width?: string;
				height?: string;
				opacity?: string;
				border?: string;
			}>()
			.notNull(),
		createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
	},
	(table) => ({
		typeIdx: index("type_idx").on(table.type),
	}),
);

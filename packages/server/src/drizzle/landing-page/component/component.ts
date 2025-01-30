import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

const componentTypes = ["text", "image", "video", "button", "block"] as const;

export const componentTable = sqliteTable(
	"landing_page.components",
	{
		id: integer("id").primaryKey(),
		type: text("type", { enum: componentTypes }).notNull(),
		content: text("content", { mode: "json" }).$type<
			| { type: "text"; text: string }
			| { type: "image"; url: string; alt?: string }
			| { type: "video"; url: string }
			| { type: "button"; text: string; url: string }
			| { type: "block"; children: Array<{ id: number }> }
		>(),
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

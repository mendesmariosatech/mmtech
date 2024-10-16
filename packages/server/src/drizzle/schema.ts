import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const authTable = sqliteTable("auth", {
	id: text("id", { length: 128 }).$defaultFn(() => `AU_` + createId()),
	passwordDigest: text("password_digest").notNull(),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	email: text("email").unique().notNull(),
});

export const usersTable = sqliteTable("user", {
	id: text("id", { length: 128 }).$defaultFn(() => `US_` + createId()),
	name: text("name").notNull(),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const usersRelations = relations(usersTable, ({ one }) => ({
	authId: one(usersTable),
}));

export const authRelations = relations(authTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [authTable.id],
		references: [usersTable.id],
	}),
}));

export type InsertAuth = typeof authTable.$inferInsert;
export type SelectAuth = typeof authTable.$inferSelect;

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { genEntityId } from "../utils";
import { clientTable } from "../schema";
import { sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const PlanMasterId = z.string().brand("PlanMasterId");
const PlanMasterTasksId = z.string().brand("PlanMasterTasksId");

export const planMaster = sqliteTable("plan_master", {
	planMasterId: text("planMasterId", { length: 128 })
		.$defaultFn(() => genEntityId("PM"))
		.primaryKey()
		.notNull(),
	name: text("name").notNull(),
	description: text("description"),
	createdAt: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const GetSchemaPlanMaster = createSelectSchema(planMaster);

export const PlanMaster = createInsertSchema(planMaster).pick({
	name: true,
	description: true,
});

export type PlanMaster = z.infer<typeof PlanMaster>;

export const planMasterTasks = sqliteTable("plan_master_tasks", {
	planMasterTasksId: text("planMasterTasksId", { length: 128 })
		.$defaultFn(() => genEntityId("PMT"))
		.primaryKey()
		.notNull(),
	planMasterId: text("plan_master_id")
		.references(() => planMaster.planMasterId, { onDelete: "cascade" })
		.notNull(),
	name: text("name").notNull(),
	description: text("description"),
	createdAt: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

const PlanMasterTasks = createInsertSchema(planMasterTasks)
	.pick({
		name: true,
		description: true,
		planMasterId: true,
	})
	.transform((value) => {
		return {
			...value,
			planMasterId: PlanMasterTasksId.parse(value.planMasterId),
		};
	});

type PlanMasterTasks = z.infer<typeof PlanMasterTasks>;

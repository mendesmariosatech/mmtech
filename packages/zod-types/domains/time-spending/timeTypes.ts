import { z } from "zod";

export const TimeActivitySchema = z.object({
	id: z.string().uuid().optional(),
	activity: z.string().min(1, "Activity is required"),
	minutes: z
		.number()
		.min(1, "Minutes must be positive")
		.max(1440, "Cannot exceed 24 hours"),
	cost: z.number().min(0),
	timestamp: z.string().datetime(),
	userId: z.string().optional(), // For future backend integration
	createdAt: z.date().default(() => new Date()),
	updatedAt: z.date().default(() => new Date()),
});

export const CreateTimeActivitySchema = TimeActivitySchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	cost: true, // Will be calculated
});

export const DailyBudgetSchema = z.object({
	date: z.string(),
	totalBudget: z.number().default(86400),
	spentBudget: z.number().min(0),
	remainingBudget: z.number().min(0),
	activities: z.array(TimeActivitySchema),
});

export type TimeActivity = z.infer<typeof TimeActivitySchema>;
export type CreateTimeActivity = z.infer<typeof CreateTimeActivitySchema>;
export type DailyBudget = z.infer<typeof DailyBudgetSchema>;

// Constants
export const TIME_CONSTANTS = {
	DAILY_BUDGET: 86400, // $86,400 representing 86,400 seconds in a day
	COST_PER_MINUTE: 60, // $60 per minute (1 dollar per second)
	COST_PER_SECOND: 1, // $1 per second
} as const;

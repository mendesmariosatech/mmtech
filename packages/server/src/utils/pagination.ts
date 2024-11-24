import { z } from "@hono/zod-openapi";

export const PaginationSchema = z.object({
	page: z
		.string()
		.refine((value) => !isNaN(Number(value)), {
			message: "Page must be a number",
		})
		.transform(Number)
		.default("1"),
	limit: z
		.string()
		.refine((value) => !isNaN(Number(value)), {
			message: "Limit must be a number",
		})
		.transform(Number)
		.default("10"),
});

export type PaginationSchema = z.infer<typeof PaginationSchema>;

import { z } from "@hono/zod-openapi";

export const PaginationSchema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
});

export type PaginationSchema = z.infer<typeof PaginationSchema>;

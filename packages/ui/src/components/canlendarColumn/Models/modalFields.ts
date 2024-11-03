import { z } from "zod";

const texts = {
	EN: {
		error: {
			title: "title is required to have +3 characters",
		},
	},
	PT: {
		error: {
			title: "Nome é obrigatório e deve ter pelo menos 3 caracteres",
		},
	},
} as const;

export const modalFields = z.object({
	id: z.string().optional(),
	titleEvent: z.string().min(1, { message: texts.EN.error.title }),
	textAreaLabel: z.string().optional(),
	tagName: z.string().optional(),
	allDays: z.boolean().optional(),
	StartDate: z.string().min(1, { message: "Start date please" }),
	EndDate: z.string().optional(),
	Color: z.string(),
});

export type ModalFields = z.infer<typeof modalFields>;

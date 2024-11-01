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
	titleEvent: z.string().min(1, { message: texts.EN.error.title }),
	textAreaLabel: z.string(),
	tagName: z.string(),
	allDays: z.boolean(),
	StartDate: z.string(),
	EndDate: z.string(),
	Color: z.string(),
});

export type ModalFields = z.infer<typeof modalFields>;

import { z } from "zod";
import { password } from "./common"

const loginTexts = {
	EN: {
		error: {
			email: "Invalid email address",
		},
	},
	PT: {
		error: {
			email: "Endereço de e-mail inválido",
		},
	},
} as const;

// A gente quer criar um schema de login que vai ser usado no Portugues e no ingles
export const loginFields = z.object({
	email: z.string().email({ message: loginTexts.EN.error.email }),
	password,
});

export type LoginFields = z.infer<typeof loginFields>;

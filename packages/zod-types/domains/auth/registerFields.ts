import { z } from "zod";
import { password } from "./common"

const texts = {
	EN: {
		error: {
			name: "Name is required to have +3 characters",
			email: "Invalid email address",
			phone: "Phone number is required",
			agreeTerms: "You must agree to the terms and conditions",
		},
	},
	PT: {
		error: {
			name: "Nome é obrigatório e deve ter pelo menos 3 caracteres",
			email: "Endereço de e-mail inválido",
			phone: "Número de telefone é obrigatório",
			password: "A senha deve conter pelo menos uma letra maiúscula",
			agreeTerms: "Você deve concordar com os termos e condições",
		},
	},
} as const;

export const registerFields = z.object({
	name: z.string().min(1, { message: texts.EN.error.name }),
	email: z.string().email({ message: texts.EN.error.email }),
	phone: z.string().min(9, { message: texts.EN.error.phone }),
	password,
	agreeTerms: z.literal(true, {
		message: texts.EN.error.agreeTerms,
	}),
});

export type RegisterFields = z.infer<typeof registerFields>;

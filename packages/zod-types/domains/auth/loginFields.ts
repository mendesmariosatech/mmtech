import { z } from "zod";


const loginTexts = {
  EN: {
    error: {
      email: "Invalid email address",
      password: "Password must contain at least one uppercase letter",
    }
  },
  PT: {
    error: {
      email: "Endereço de e-mail inválido",
      password: "A senha deve conter pelo menos uma letra maiúscula",
    }
  }
} as const;


// A gente quer criar um schema de login que vai ser usado no Portugues e no ingles
export const loginFields = z.object({
  email: z.string().email({ message: loginTexts.EN.error.email }),
  password: z
    .string()
    .min(6)
    .refine((val) => /[A-Z]/.test(val), {
      message: loginTexts.EN.error.password,
    }),
});


export type LoginFields = z.infer<typeof loginFields>;
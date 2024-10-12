import { z } from "zod";

const loginTexts = {
  EN: {
    error: {
      password: "Password must contain at least one uppercase letter",
    },
  },
  PT: {
    error: {
      password: "A senha deve conter pelo menos uma letra maiúscula",
    },
  },
} as const;

export const password = z
  .string()
  .min(6)
  .refine((val) => /[A-Z]/.test(val), {
    message: loginTexts.EN.error.password,
  })
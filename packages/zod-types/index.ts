import { z } from "zod";

export const registerFields = z.object({
  name: z.string().min(1, { message: "Name is required to have +3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  password: z.string().min(6).refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  }),
  agreeTerms: z.literal(true, {
    message: "You must agree to the terms and conditions",
  })
});

export type RegisterFields = z.infer<typeof registerFields>;
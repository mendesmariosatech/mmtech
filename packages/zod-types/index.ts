import { z } from "zod";

export const registerFields = z.object({
	name: z
		.string()
		.min(3, { message: "Name is required to have +3 characters" }),
	email: z.string().email({ message: "Invalid email address" }),
	phone: z.string().min(9, { message: "Phone number is required" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long" })
		.refine((val) => /[A-Z]/.test(val), {
			message: "Password must contain at least one uppercase letter",
		})
		.refine((val) => /\d/.test(val), {
			message: "Password must contain at least one digit",
		}),
	agreeTerms: z.literal(true, {
		message: "You must agree to the terms and conditions",
	}),
});

export type RegisterFields = z.infer<typeof registerFields>;

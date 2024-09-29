import { z } from "zod";
import { ConfigObject } from "../../ControlledInput";

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

export const registerFormConfig: ConfigObject<RegisterFields> = {
  name: {
    name: "name",
    input: "text",
    label: "Name",
    description: "Enter your name",
    // required: "Name is required",
  },
  email: {
    name: "email",
    input: "text",
    label: "Email",
    // required: "Email is required",
  },
  phone: {
    name: "phone",
    input: "text",
    label: "Phone",
  },
  password: {
    name: "password",
    input: "text",
    // input: "password",
    label: "Password",
    // required: "Password is required",
  },
  agreeTerms: {
    name: "agreeTerms",
    input: "text",
    label: "Agree",
    //   required: "You must agree to the terms and conditions",
  }
}


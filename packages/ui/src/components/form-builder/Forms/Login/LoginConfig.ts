import { LoginFields } from "@repo/zod-types";
import type { ConfigObject } from "../../ControlledInput";

export const loginFormConfig: ConfigObject<LoginFields> = {
  email: {
    name: "email",
    input: "text",
    label: "Email",
    placeholder: "Enter your email",
    // required: "Email is required",
  },
  password: {
    name: "password",
    input: "text",
    // input: "password",
    label: "Password",
    placeholder: "Enter your password",
    // required: "Password is required",
  },
};

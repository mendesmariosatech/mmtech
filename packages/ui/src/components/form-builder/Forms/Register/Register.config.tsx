import { ConfigObject } from "../../ControlledInput";
import { RegisterFields } from "@repo/zod-types";

export const registerFormConfig: ConfigObject<RegisterFields> = {
	name: {
		name: "name",
		input: "text",
		label: "Name",
		placeholder: "Enter your name",
		// description: "Enter your name",
		// required: "Name is required",
	},
	email: {
		name: "email",
		input: "text",
		label: "Email",
		placeholder: "Enter your email",
		// required: "Email is required",
	},
	phone: {
		name: "phone",
		input: "text",
		label: "Phone",
		placeholder: "Enter your phone number",
	},
	password: {
		name: "password",
		input: "text",
		// input: "password",
		label: "Password",
		placeholder: "Enter your password",
		// required: "Password is required",
	},
	agreeTerms: {
		name: "agreeTerms",
		input: "checkbox",
		checkboxLabel: " Accept terms and conditions",
		//   required: "You must agree to the terms and conditions",
	},
};

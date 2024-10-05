"use client";
import { DevTool } from "@hookform/devtools";
import { ReloadIcon } from "@radix-ui/react-icons"

import { ControlledForm } from "../../ControlledForm";
import { Button } from "../../../ui/button";
import { registerFormConfig } from "./Register.config";
import { type RegisterFields } from "@repo/zod-types";
import { useRegister } from "@repo/hook-services";
import { useRegisterForm } from "./useRegister.hooks";
import { error } from "console";

const texts = {
	EN: {
		button: "Submit"
	},
	PT: {
		button: "Entrar"
	}
} as const

type RegisterFormProps = {
	mutate: ReturnType<typeof useRegister>["mutate"];
	isPending: ReturnType<typeof useRegister>["isPending"];
	error: ReturnType<typeof useRegister>["error"];
};

export const RegisterForm = (mutation: RegisterFormProps) => {
	const form = useRegisterForm();

	const handleSubmit = (data: RegisterFields) => {
		console.log(data);
		mutation.mutate(data);
	};

	console.log("Errors", form.formState.errors);

	mutation.error?.message


	return (
		<div className="border-2 border-gray-500 p-4">
			<DevTool control={form.control} />
			<ControlledForm
				useForm={form}
				config={registerFormConfig}
				onSubmit={handleSubmit}
			>
				<div style={{
					padding: "1rem"
				}}>
					<Button
						type="submit"
						disabled={mutation.isPending}
						className="w-full"
					>
						<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
						{texts.EN.button}
					</Button>
				</div>
			</ControlledForm>
			<p style={{ border: "1px solid red" }}>
				{mutation.error?.message}
			</p>
		</div>
	);
};

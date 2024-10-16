"use client";
import { DevTool } from "@hookform/devtools";
import { ReloadIcon } from "@radix-ui/react-icons";

import { ControlledForm } from "../../ControlledForm";
import { Button } from "../../../ui/button";
import { registerFormConfig } from "./Register.config";
import { type RegisterFields } from "@repo/zod-types";
import { useRegister } from "@repo/hook-services";
import { useRegisterForm } from "./useRegister.hooks";

const texts = {
	EN: {
		button: "Submit",
		loading: "Loading...",
	},
	PT: {
		button: "Entrar",
		loading: "Carregando...",
	},
} as const;

type RegisterFormProps = {
	mutate: ReturnType<typeof useRegister>["mutate"];
	isPending: ReturnType<typeof useRegister>["isPending"];
	error: ReturnType<typeof useRegister>["error"];
};

export const RegisterForm = (props: RegisterFormProps) => {
	const form = useRegisterForm();

	const handleSubmit = (data: RegisterFields) => {
		props.mutate(data);
	};

	return (
		<div className="border-2 border-primary-foreground p-6 rounded-md">
			<DevTool control={form.control} />
			<ControlledForm
				useForm={form}
				config={registerFormConfig}
				onSubmit={handleSubmit}
			>
				<div
					style={{
						padding: "1rem",
					}}
				>
					<Button type="submit" disabled={props.isPending} className="w-full">
						{props.isPending ? (
							<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
						) : null}
						{props.isPending ? texts.EN.loading : texts.EN.button}
					</Button>
				</div>
			</ControlledForm>
			{props.error?.message ? (
				<p style={{ color: "red", textAlign: "center" }}>
					{props.error?.message}
				</p>
			) : null}
		</div>
	);
};

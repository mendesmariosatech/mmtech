"use client";
import React from "react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ControlledForm } from "../../ControlledForm";
import { Button } from "../../../ui/button";
import { registerFormConfig } from "./Register.config";
import { type RegisterFields, registerFields } from "@repo/zod-types";
import { useRegister } from "@repo/hooks-server";
import { useRouter } from "next/navigation";
import { ronaldo } from "@repo/hook-services";

type RegisterFormProps = {
	mutate: ReturnType<typeof useRegister>["mutate"];
	data: ReturnType<typeof useRegister>["data"];
	isPending: ReturnType<typeof useRegister>["isPending"];
	error: ReturnType<typeof useRegister>["error"];
};

ronaldo

const registerForm = () =>
	useForm<RegisterFields>({
		resolver: zodResolver(registerFields),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			password: "",
			agreeTerms: undefined,
		},
	});

export const RegisterForm = (mutation: RegisterFormProps) => {
	const form = registerForm();

	const handleSubmit = (data: RegisterFields) => {
		console.log(data);
		alert(JSON.stringify(data));
		mutation.mutate(data);
	};

	console.log("Errors", form.formState.errors);

	return (
		<>
			<DevTool control={form.control} />
			<ControlledForm
				useForm={form}
				config={registerFormConfig}
				onSubmit={handleSubmit}
			/>
			<div style={{ justifyContent: "end", display: "flex", padding: "1rem" }}>
				<Button
					onClick={form.handleSubmit(handleSubmit)}
					type="submit"
					disabled={mutation.isPending}
				>
					Submit
				</Button>
			</div>
		</>
	);
};

export function RegisterPage() {
	const router = useRouter();
	const register = useRegister();

	return (
		<RegisterForm
			data={register.data}
			isPending={register.isPending}
			error={register.error}
			mutate={register.mutate}
		/>
	);
}

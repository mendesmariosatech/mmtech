"use client";
import { DevTool } from "@hookform/devtools";

import { ControlledForm } from "../../ControlledForm";
import { Button } from "../../../ui/button";
// import { LoginFormConfig } from "./Login.config";
import { type LoginFields } from "@repo/zod-types";
import { useLogin } from "@repo/hook-services";
import { loginFormConfig } from "./LoginConfig";
import { useLoginForm } from "./useLogin.hook";
import { ReloadIcon } from "@radix-ui/react-icons";
// import { useLoginForm } from "./useLogin.hooks";

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

type LoginFormProps = {
	mutate: ReturnType<typeof useLogin>["mutate"];
	isPending: ReturnType<typeof useLogin>["isPending"];
	error: ReturnType<typeof useLogin>["error"];
};

export const LoginForm = (props: LoginFormProps) => {
	const form = useLoginForm();

	const handleSubmit = (data: LoginFields) => {
		props.mutate(data);
	};

	return (
		<div className="border-2 border-primary-foreground p-6 rounded-md">
			<DevTool control={form.control} />
			<ControlledForm
				useForm={form}
				config={loginFormConfig}
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

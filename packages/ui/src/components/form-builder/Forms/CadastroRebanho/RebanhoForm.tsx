"use client";
import { DevTool } from "@hookform/devtools";

import { ControlledForm } from "../../ControlledForm";
import { Button } from "../../../ui/button";
// import { LoginFormConfig } from "./Login.config";
import { type LoginFields } from "@repo/zod-types";
import { useLogin } from "@repo/hook-services";
// import { loginFormConfig } from "./LoginConfig";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
	CadastroRebanhoFields,
	cadatroRebanhoFields,
	rebanhoFormConfig,
} from "./FormConfig";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
	mutate: () => void;
	isPending: ReturnType<typeof useLogin>["isPending"];
	error: ReturnType<typeof useLogin>["error"];
};

const useRebanhoForm = () =>
	useForm<CadastroRebanhoFields>({
		resolver: zodResolver(cadatroRebanhoFields),
		defaultValues: {
			nickname: "",
			identification: "",
			type: "",
			breed: "",
			bornDate: "",
		},
	});

export const RebanhoForm = (props: LoginFormProps) => {
	const form = useRebanhoForm();

	const handleSubmit = (data: CadastroRebanhoFields) => {
		// props.mutate(data);
		alert(data);
	};

	return (
		<div className="border-2 border-primary-foreground p-6 rounded-md">
			<DevTool control={form.control} />
			<ControlledForm
				useForm={form}
				config={rebanhoFormConfig}
				onSubmit={handleSubmit}
			>
				<div className="py-4">
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

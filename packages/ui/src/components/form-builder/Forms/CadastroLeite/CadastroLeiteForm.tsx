"use client";
import { DevTool } from "@hookform/devtools";

import { ControlledForm } from "../../ControlledForm";
import { Button } from "../../../ui/button";
import { useLogin } from "@repo/hook-services";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CadastroLeiteFields,
	cadatroLeiteFields,
	leiteFormConfig,
} from "./FormConfig";

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
	useForm<CadastroLeiteFields>({
		resolver: zodResolver(cadatroLeiteFields),
		defaultValues: {
			valor: "",
			month: "",
		},
	});

export const CadastroLeiteForm = (props: LoginFormProps) => {
	const form = useRebanhoForm();

	const handleSubmit = (data: CadastroLeiteFields) => {
		// props.mutate(data);
		alert(JSON.stringify(data));
	};

	return (
		<div className="border-2 border-primary-foreground p-6 rounded-md">
			<DevTool control={form.control} />
			<ControlledForm
				useForm={form}
				config={leiteFormConfig}
				onSubmit={handleSubmit}
			>
				<div className="py-4">
					<Button type="submit" disabled={props.isPending} className="w-full">
						{props.isPending ? (
							<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
						) : null}
						{props.isPending ? texts.PT.loading : texts.PT.button}
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

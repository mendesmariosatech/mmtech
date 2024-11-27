"use client";
import { ControlledForm } from "../../ControlledForm";
import { Button } from "../../../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ConfigObject } from "../../ControlledInput";
import { Dialog, DialogContent } from "../../../ui/dialog";
import { useCreateBusiness } from "@repo/hook-services";
import { CreateBusinessInput } from "@repo/server/business";

const texts = {
	EN: {
		button: "Submit",
		loading: "Loading...",
		nameRequired: "Name is required to have +3 characters",
		businessSlug: "Unique Identifier",
		businessNamelabel: "Business name",
		businessNamePlaceholder: "Enter your business name",
		businessSluglabel: "Unique Identifier",
		businessSlugPlaceholder: "E.g. acme-business-123",
	},
	PT: {
		button: "Entrar",
		loading: "Carregando...",
		nameRequired: "Nome é obrigatório e deve ter pelo menos 3 caracteres",
		businessSlug: "Identificador Único",
		businessNamelabel: "Nome do business",
		businessNamePlaceholder: "Acme. S/A",
		businessSluglabel: "Slug",
		businessSlugPlaceholder: "Ex: acme-business-123",
	},
} as const;

type LoginFormProps = {
	mutate: ReturnType<typeof useCreateBusiness>["mutate"];
	isPending: boolean;
	error: Error | null;
};

// remove unused keys
export const businessFormConfig: ConfigObject<CreateBusinessInput> = {
	name: {
		name: "name",
		input: "text",
		label: texts["EN"].businessNamelabel,
		placeholder: texts["EN"].businessNamePlaceholder,
	},
	description: {
		name: "description",
		input: "textarea",
		label: "Description",
		placeholder: "Enter your business description",
	},
	slug: {
		name: "slug",
		input: "text",
		label: texts["EN"].businessSluglabel,
		placeholder: texts["EN"].businessSlugPlaceholder,
	},
};

// if the business exists, the user will not see this modal
// right now, we want to send the business information to the server
export const BusinessFormModal = (props: LoginFormProps) => {
	const form = useForm<CreateBusinessInput>({
		resolver: zodResolver(CreateBusinessInput),
		defaultValues: {
			name: "",
			slug: "",
			description: "",
		},
	});

	const handleSubmit = (data: CreateBusinessInput) => {
		props.mutate(data);
	};

	return (
		<Dialog open modal>
			<DialogContent className="sm:max-w-md [&>button]:hidden">
				<div className="border-2 border-primary-foreground p-6 rounded-md">
					<ControlledForm
						useForm={form}
						config={businessFormConfig}
						onSubmit={handleSubmit}
					>
						<div className="py-4">
							<Button
								type="submit"
								disabled={props.isPending}
								className="w-full"
							>
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
			</DialogContent>
		</Dialog>
	);
};

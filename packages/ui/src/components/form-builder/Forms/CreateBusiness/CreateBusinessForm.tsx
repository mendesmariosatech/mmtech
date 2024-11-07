"use client";
import { ControlledForm } from "../../ControlledForm";
import { Button } from "../../../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ConfigObject } from "../../ControlledInput";
import { Dialog, DialogContent } from "../../../ui/dialog";

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
	isPending: boolean;
	error: Error | null;
};

// the business path needs to some path that will serve as a unique identifier for the business
// this will be used to generate the business URL

// zod refine type will transform any test to a dash version of the string

const businessSchema = z.object({
	businessName: z
		.string()
		.min(3, { message: "Name is required to have +3 characters" }),
	businessPath: z
		.string()
		.min(3, { message: "Name is required to have +3 characters" })
		.refine((path) => {
			return /^[a-z0-9-]+$/.test(path);
		}),
});

type BusinessSchema = z.infer<typeof businessSchema>;

export const businessFormConfig: ConfigObject<BusinessSchema> = {
	businessName: {
		name: "businessName",
		input: "text",
		label: "Business name",
		placeholder: "Enter your business name",
		// required: "Email is required",
	},
	businessPath: {
		name: "businessPath",
		input: "text",
		label: "Unique Identifier",
		placeholder: "E.g. my-cool-ass-business",
	},
};

export const BusinessFormModal = (props: LoginFormProps) => {
	const form = useForm<BusinessSchema>({
		resolver: zodResolver(businessSchema),
		defaultValues: {
			businessName: "",
			businessPath: "",
		},
	});

	const handleSubmit = (data: BusinessSchema) => {
		// props.mutate(data);
		console.log({
			data,
		});
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

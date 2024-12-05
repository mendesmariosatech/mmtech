import React from "react";
import type {
	FieldValues,
	SubmitHandler,
	UseFormReturn,
} from "react-hook-form";

import { type ConfigObject, ControlledInput } from "./ControlledInput";
import { Form } from "../ui/form";
import { DevTool } from "@hookform/devtools";

type ControlledForm<T extends FieldValues> = {
	// TODO: improve typing Generic
	config: ConfigObject<FieldValues>;
	useForm: UseFormReturn<T, any>;
	onSubmit: SubmitHandler<T>;
	children?: React.ReactNode;
};

export const ControlledForm = <T extends FieldValues>({
	useForm,
	config,
	onSubmit,
	children,
}: ControlledForm<T>) => {
	return (
		<Form {...useForm}>
			<DevTool control={useForm.control} />
			<form onSubmit={useForm.handleSubmit(onSubmit)}>
				{Object.entries(config).map(([key, value]) => {
					return (
						<div key={key}>
							{value.input === "text" ? (
								<ControlledInput
									key={key}
									{...useForm}
									{...value}
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									//  @ts-expect-error
									name={key}
									input={value.input}
								/>
							) : (
								<ControlledInput
									key={key}
									{...useForm}
									{...value}
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									//  @ts-expect-error
									name={key}
									input={value.input}
								/>
							)}
						</div>
					);
				})}
				{children}
			</form>
		</Form>
	);
};

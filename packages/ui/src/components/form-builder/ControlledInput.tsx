import React from "react";
import {
	Controller,
	FieldPath,
	FieldValues,
	UseFormReturn,
} from "react-hook-form";
import { Input, InputProps } from "../ui/input";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

type FormConfig = {
	label?: string;
	description?: string;
};

type CheckBox<D extends FieldValues> = {
	name: FieldPath<D>;
	input: "checkbox";
	checkboxLabel: string;
} & FormConfig;

type DropdownProps<D extends FieldValues> = {
	name: FieldPath<D>;
	input: "select";
} & FormConfig;
// & Omit<Props<{ label: string }>, "onChange">;

type InputText<D extends FieldValues> = {
	name: FieldPath<D>;
	input: "text";
} & InputProps &
	FormConfig;

export type ConfigObject<D extends FieldValues> = {
	[K in FieldPath<D>]: DropdownProps<D> | InputText<D> | CheckBox<D>;
};

type ControlledInputProps<D extends FieldValues> = UseFormReturn<D, any> &
	(DropdownProps<D> | InputText<D> | CheckBox<D>);

export const ControlledInput = <D extends FieldValues>(
	props: ControlledInputProps<D>,
) => {
	return (
		<FormField
			name={props.name}
			control={props.control}
			// TODO: Have a standard TextInput component
			render={({ field }) => {
				return (
					<FormItem>
						<FormLabel>{props.label}</FormLabel>
						{props.input === "text" ? (
							<FormControl>
								<Input {...field} {...props} />
							</FormControl>
						) : props.input === "select" ? (
							<>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a verified email to display" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="m@example.com">m@example.com</SelectItem>
										<SelectItem value="m@google.com">m@google.com</SelectItem>
										<SelectItem value="m@support.com">m@support.com</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</>
						) : (
							<FormControl>
								<>
									<Checkbox
										id="terms"
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
									<label
										htmlFor="terms"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										{props.checkboxLabel}
									</label>
								</>
							</FormControl>
						)}
						{props.description ? (
							<FormDescription>{props.description}</FormDescription>
						) : null}
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};

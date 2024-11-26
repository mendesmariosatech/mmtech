import React from "react";
import {
	type FieldPath,
	type FieldValues,
	type UseFormReturn,
} from "react-hook-form";
import { Input, type InputProps } from "../ui/input";
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
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

type FormConfig = {
	label?: string;
	description?: string;
	placeholder?: string;
	disabled?: boolean;
};

type CheckBox<D extends FieldValues> = {
	name: FieldPath<D>;
	input: "checkbox";
	checkboxLabel: string;
	value: boolean;
} & FormConfig;

type DropdownOptions = {
	key: string;
	value: string;
};

type DropdownProps<D extends FieldValues> = {
	name: FieldPath<D>;
	input: "select";
	options: DropdownOptions[];
} & FormConfig;

type InputText<D extends FieldValues> = {
	name: FieldPath<D>;
	input: "text" | "date" | "datetime-local" | "color";
} & InputProps &
	FormConfig;
//

// Add the TextAreaInput type
type TextAreaInput<D extends FieldValues> = {
	name: FieldPath<D>;
	input: "textarea"; // New type for textarea
} & FormConfig;

export type ConfigObject<D extends FieldValues> = {
	[K in FieldPath<D>]:
		| DropdownProps<D>
		| InputText<D>
		| CheckBox<D>
		| TextAreaInput<D>;
};

type ControlledInputProps<D extends FieldValues> = UseFormReturn<D, any> &
	(DropdownProps<D> | InputText<D> | CheckBox<D> | TextAreaInput<D>); // Include textarea here

export const ControlledInput = <D extends FieldValues>(
	props: ControlledInputProps<D>,
) => {
	return (
		<FormField
			name={props.name}
			control={props.control}
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
											<SelectValue placeholder={props.placeholder} />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{props.options.map((option) => (
											<SelectItem key={option.key} value={option.key}>
												{option.value}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</>
						) : props.input === "checkbox" ? (
							<FormControl>
								<div className="flex items-center space-x-2 pl-2 py-2">
									<Checkbox
										id={field.name}
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
									<Label
										htmlFor={field.name}
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										{props.checkboxLabel}
									</Label>
								</div>
							</FormControl>
						) : props.input === "textarea" ? ( // Handle textarea input
							<FormControl>
								<Textarea
									{...field}
									placeholder={props.placeholder}
									className="textarea-class" // Add necessary classes
								/>
							</FormControl>
						) : props.input === "color" ? ( // Handle color input
							<FormControl>
								<Input
									{...field}
									type="color" // Set the type to color
									className="color-input-class" // Add necessary classes
								/>
							</FormControl> // Handle date or datetime-local input
						) : props.input === "date" || props.input === "datetime-local" ? (
							<FormControl>
								<Input
									{...field}
									type={props.input} // "date" or "datetime-local"
								/>
							</FormControl>
						) : null}
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

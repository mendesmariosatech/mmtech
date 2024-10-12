import React from "react";
import { Label } from "../label";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../card";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { ControlledForm } from "../../form-builder/ControlledForm";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../button";
import { ConfigObject } from "../../form-builder/ControlledInput";

const itemSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().optional(),
	price: z.number().positive("Price must be a positive number"),
	category: z.enum(["product", "service"]),
});

type ItemSchema = z.infer<typeof itemSchema>;

const useItemForm = () =>
	useForm<ItemSchema>({
		resolver: zodResolver(itemSchema),
		defaultValues: {
			name: "",
			price: 1000,
			category: "product",
			description: "",
		},
	});

export const itemFormConfig: ConfigObject<ItemSchema> = {
	name: {
		name: "name",
		input: "text",
		label: "Item Name",
		placeholder: "Enter item name",
		required: true,
	},
	description: {
		name: "description",
		input: "text",
		label: "Description",
		placeholder: "Enter a description (optional)",
	},
	price: {
		name: "price",
		input: "text",
		label: "Price",
		placeholder: "Enter price",
		// required: "Price is required",
	},
	category: {
		name: "category",
		input: "select",
		label: "Category",
		options: [
			{ key: "product", value: "Product" },
			{ key: "category", value: "Category" },
		],
	},
};

export const FormWrapper = () => {
	const form = useItemForm();

	const handleSubmit = (data: ItemSchema) => {
		console.log(data);
	};

	return (
		<Card x-chunk="dashboard-07-chunk-0">
			<CardHeader>
				<CardTitle>Product Details</CardTitle>
				<CardDescription>
					Lipsum dolor sit amet, consectetur adipiscing elit
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ControlledForm
					useForm={form}
					config={itemFormConfig}
					onSubmit={handleSubmit}
				>
					<div className="mt-4">
						<Button type="submit" variant="outline" size="sm">
							Discard
						</Button>
					</div>
				</ControlledForm>
			</CardContent>
		</Card>
	);
};

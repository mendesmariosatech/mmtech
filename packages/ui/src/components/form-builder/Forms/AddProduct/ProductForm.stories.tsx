import type { Meta, StoryObj } from "@storybook/react";
import { ProductForm } from "./ProductForm";

const meta = {
	title: "Forms/ProductForm",
	component: ProductForm,
} satisfies Meta<typeof ProductForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseProductForm: Story = {
	args: {},
};

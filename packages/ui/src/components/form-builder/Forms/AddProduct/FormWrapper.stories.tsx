import type { Meta, StoryObj } from "@storybook/react";
import { FormWrapper } from "./FormWrapper";

const meta = {
	title: "FormWrapper",
	component: FormWrapper,
} satisfies Meta<typeof FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseFormWrapper: Story = {
	args: {},
};

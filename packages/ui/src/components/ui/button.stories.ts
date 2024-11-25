import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

// ronaldo
const meta = {
	title: "Design System/Button",
	component: Button,
	tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonPrimary: Story = {
	args: {
		children: "button",
		variant: "default",
	},
};

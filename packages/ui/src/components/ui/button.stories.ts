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
		className: "w-36",
	},
};

export const ButtonSecondary: Story = {
	args: {
		children: "button",
		variant: "secondary",
		className: "w-36",
	},
};

export const ButtonOutline: Story = {
	args: {
		children: "button",
		variant: "outline",
		className: "w-36 border-slate-200",
	},
};

export const ButtonGhost: Story = {
	args: {
		children: "button",
		variant: "ghost",
		className: "w-36",
	},
};

import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

// ronaldo
const meta = {
	title: "Button",
	component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonPrimary: Story = {};

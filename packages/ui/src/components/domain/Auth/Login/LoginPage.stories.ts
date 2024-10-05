import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { LoginPage } from "./LoginPage";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Auth/Login",
	component: LoginPage,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

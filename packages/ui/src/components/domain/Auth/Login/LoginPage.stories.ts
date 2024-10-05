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
	args: {
		// async handleLogIn(email, password) {
		// 	console.log("handleLogin", email, password);
		// },
	},
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		// async handleLogIn(email, password) {
		// 	console.log("handleLogin", email, password);
		// },
		isLoading: false,
	},
};

export const Success: Story = {
	args: {
		// async handleLogIn(email, password) {
		// 	console.log("handleLogin", email, password);
		// },
		isLoading: false,
	},
};

export const Error: Story = {
	args: {
		// async handleLogIn(email, password) {
		// 	console.log("handleLogin", email, password);
		// },
		isLoading: false,
	},
};

import type { Meta, StoryObj } from "@storybook/react";

import { RegisterForm } from "./RegisterForm";

const meta = {
	title: "Forms/Register",
	component: RegisterForm,
	argTypes: {},
	args: {},
} satisfies Meta<typeof RegisterForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {
	args: {
		mutate: () => {},
		isPending: true,
		error: null,
	},
};

export const Default: Story = {
	args: {
		mutate: () => {},
		isPending: false,
		error: null,
	},
};

export const Error: Story = {
	args: {
		mutate: () => {},
		isPending: false,
		error: {
			message: "Error",
			name: "Error",
		},
	},
};

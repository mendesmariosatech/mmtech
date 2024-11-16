import type { Meta, StoryObj } from "@storybook/react";

import { RebanhoForm } from "./RebanhoForm";

const meta = {
	title: "Forms/RebanhoForm",
	component: RebanhoForm,
	argTypes: {},
	args: {},
} satisfies Meta<typeof RebanhoForm>;

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

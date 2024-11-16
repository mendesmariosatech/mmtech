import type { Meta, StoryObj } from "@storybook/react";

import { CadastroLeiteForm } from "./CadastroLeiteForm";

const meta = {
	title: "Forms/CadastroLeiteForm",
	component: CadastroLeiteForm,
	argTypes: {},
	args: {},
} satisfies Meta<typeof CadastroLeiteForm>;

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

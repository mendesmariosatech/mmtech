import { Meta, StoryObj } from "@storybook/react";
import CelendarColumnBuilder from "./CelendarColumnBuilder";

const meta = {
	title: "Calendar Column",
	component: CelendarColumnBuilder,
	argTypes: {},
} satisfies Meta<typeof CelendarColumnBuilder>;

export default meta;

type Story = StoryObj<typeof CelendarColumnBuilder>;

export const CalendarColumnBuilder: Story = {
	args: {
		language: "EN",
		name: "John Doe",
		email: "john.doe@example.com",
		colorUser: "bg-blue-500",
		collapseData: {
			title: "Collapse Title",
			icon: "ChevronRight",
			items: [
				{
					id: 1,
					label: "Teste 1",
					isChecked: false,
				},
				{
					id: 2,
					label: "Teste 2",
					isChecked: true,
				},
			],
		},
	},
};

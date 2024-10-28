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
		eventsData: [
			{
				id: "1",
				title: "Meeting with Team",
				start: new Date(2024, 9, 21, 10, 0),
				end: new Date(2024, 9, 21, 11, 0),
				description: "Discuss project progress",
				tag: [{ name: "Work", color: "#FF0000" }],
			},
			{
				id: "2",
				title: "Lunch with Friends",
				start: new Date(2024, 9, 21, 12, 30),
				end: new Date(2024, 9, 21, 13, 30),
				description: "Discuss project progress",
				tag: [],
			},
		],
	},
};

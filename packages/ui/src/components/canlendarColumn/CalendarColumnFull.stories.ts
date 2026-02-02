import { Meta, StoryObj } from "@storybook/react";
import { CalendarPage } from "./CalendarColumnFull";

const meta = {
	title: "Calendar Full",
	component: CalendarPage,
	argTypes: {},
} satisfies Meta<typeof CalendarPage>;

export default meta;

type Story = StoryObj<typeof CalendarPage>;

const DataEvents = [
	{
		id: "1",
		title: "Meeting with Team",
		start: "2024-11-21T10:00",
		end: "2024-11-21T11:00",
		description: "Discuss project progress",
		tag: [{ name: "Work", color: "#FF0000" }],
	},
	{
		id: "2",
		title: "Lunch with Friends",
		start: "2024-11-16",
		end: "",
		description: "Discuss project progress",
		tag: [],
	},
	{
		id: "3",
		title: "Project Deadline",
		start: "2024-11-17",
		end: "",
		description: "Discuss project progress",
		tag: [],
	},
	{
		id: "4",
		title: "Family Dinner",
		start: "2024-11-18T18:00",
		end: "2024-11-18T20:00",
		description: "Discuss project progress",
		tag: [],
	},
];

export const CalendarColumnFull: Story = {
	args: {
		language: "PT",
		eventsData: DataEvents,
	},
};

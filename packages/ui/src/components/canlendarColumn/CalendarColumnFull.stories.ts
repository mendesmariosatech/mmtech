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
		start: new Date(2024, 9, 21, 10, 0),
		end: new Date(2024, 9, 21, 11, 0),
		description: "Discuss project progress",
		tag: "Important",
		calendar: "Work",
	},
	{
		id: "2",
		title: "Lunch with Friends",
		start: new Date(2024, 9, 21, 12, 30),
		end: new Date(2024, 9, 21, 13, 30),
		description: "Discuss project progress",
		tag: "Important",
		calendar: "Personal",
	},
	{
		id: "3",
		title: "Project Deadline",
		start: new Date(2024, 9, 22, 9, 0),
		end: new Date(2024, 9, 22, 17, 0),
		description: "Discuss project progress",
		tag: "Important",
		calendar: "Work",
	},
	{
		id: "4",
		title: "Family Dinner",
		start: new Date(2024, 9, 23, 18, 0),
		end: new Date(2024, 9, 23, 20, 0),
		description: "Discuss project progress",
		tag: "Important",
		calendar: "Family",
	},
];

const calendars = [
	{ name: "Personal", color: "bg-red-500" },
	{ name: "Work", color: "bg-blue-500" },
	{ name: "Family", color: "bg-green-500" },
];

export const CalendarColumnFull: Story = {
	args: {
		language: "PT",
		eventsData: DataEvents,
		calendarData: calendars,
	},
};

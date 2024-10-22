import { Meta, StoryObj } from "@storybook/react";
import CalendarColumn from "./CalendarColumnFull";

const meta = {
	title: "Calendar Column",
	component: CalendarColumn,
	argTypes: {},
} satisfies Meta<typeof CalendarColumn>;

export default meta;

type Story = StoryObj<typeof CalendarColumn>;

const DataEvents = [
	{
		id: "1",
		title: "Meeting with Team",
		start: new Date(2024, 9, 21, 10, 0),
		end: new Date(2024, 9, 21, 11, 0),
		calendar: "Work",
	},
	{
		id: "2",
		title: "Lunch with Friends",
		start: new Date(2024, 9, 21, 12, 30),
		end: new Date(2024, 9, 21, 13, 30),
		calendar: "Personal",
	},
	{
		id: "3",
		title: "Project Deadline",
		start: new Date(2024, 9, 22, 9, 0),
		end: new Date(2024, 9, 22, 17, 0),
		calendar: "Work",
	},
	{
		id: "4",
		title: "Family Dinner",
		start: new Date(2024, 9, 23, 18, 0),
		end: new Date(2024, 9, 23, 20, 0),
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
		language: "EN",
		eventsData: DataEvents,
		calendarData: calendars,
	},
};

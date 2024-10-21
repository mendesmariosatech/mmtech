import { Meta, StoryObj } from "@storybook/react";
import CalendarColumn from "./CalendarColumnFull";

const meta = {
	title: "Calendar Column",
	component: CalendarColumn,
	argTypes: {},
} satisfies Meta<typeof CalendarColumn>;

export default meta;

type Story = StoryObj<typeof CalendarColumn>;

export const CalendarColumnFull: Story = {
	args: {},
};

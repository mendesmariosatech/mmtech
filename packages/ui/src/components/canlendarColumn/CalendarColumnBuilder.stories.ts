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
	args: {},
};

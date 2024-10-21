import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";

const meta = {
	title: "DatePicker",
	component: DatePicker,
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseDatePicker: Story = {
	args: {},
};

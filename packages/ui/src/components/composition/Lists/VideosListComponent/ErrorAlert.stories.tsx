import type { Meta, StoryObj } from "@storybook/react";
import { ErrorAlert } from "./ErrorAlert";

const meta = {
	title: "VideoList/ErrorAlert",
	component: ErrorAlert,
} satisfies Meta<typeof ErrorAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseErrorAlert: Story = {
	args: {},
};

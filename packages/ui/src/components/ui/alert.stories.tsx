import { Meta, StoryObj } from "@storybook/react";
// import { Alert } from "./alert";
import { AlertTitle, AlertDescription, Alert } from "./alert";

export function AlertDemo() {
	return (
		<Alert>
			<AlertTitle>Heads up!</AlertTitle>
			<AlertDescription>
				You can add components to your app using the cli.
			</AlertDescription>
		</Alert>
	);
}

const meta = {
	title: "Design System/Alert",
	component: AlertDemo,
	tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlertTest: Story = {};

import { Meta, StoryObj } from "@storybook/react";
import { AlertTitle, AlertDescription, Alert } from "./alert";

type Props = {
	title: string;
	body: string;
};
function AlertDemo(props: Props) {
	return (
		<Alert>
			<AlertTitle>{props.title}</AlertTitle>
			<AlertDescription>{props.body}</AlertDescription>
		</Alert>
	);
}

const meta = {
	title: "Design System/Alert",
	component: AlertDemo,
	tags: ["autodocs"],
} satisfies Meta<typeof AlertDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlertTest: Story = {
	args: {
		title: "EXAMPLE",
		body: "Corpo",
	},
};

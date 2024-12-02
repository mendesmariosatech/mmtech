import { Meta, StoryObj } from "@storybook/react";
import {
	AlertDialog,
	AlertDialogDescription,
	AlertDialogTitle,
} from "./alert-dialog";

type Props = {
	title: string;
	description: string;
};
function AlertDialogDemo(props: Props) {
	return (
		<AlertDialog>
			<AlertDialogTitle>{props.title}</AlertDialogTitle>
			<AlertDialogDescription>{props.description}</AlertDialogDescription>
		</AlertDialog>
	);
}

const meta = {
	title: "Design System/AlertDialog",
	component: AlertDialogDemo,
	tags: ["autodocs"],
} satisfies Meta<typeof AlertDialogDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlertDialogTest: Story = {
	args: {
		title: "Warning!",
		description: "Are you sure you want to proceed?",
	},
};

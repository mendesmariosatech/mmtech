import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { LoginPage } from "./LoginPage";
import { useRouter } from "@storybook/nextjs/navigation.mock";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Auth/Login",
	component: LoginPage,
	parameters: {
		// layout: "centered",
		nextjs: {
			// 👇 As in the Next.js application, next/navigation only works using App Router
			appDirectory: true,
		},
	},
	// tags: ["autodocs"],

	argTypes: {},
	args: {},
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

import type { Meta, StoryObj } from "@storybook/react";
import { VideoList } from "./VideoList";

const meta = {
	title: "VideoList/VideoList",
	component: VideoList,
} satisfies Meta<typeof VideoList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Happy path
export const EmptyList: Story = {
	args: {
		error: false,
		data: [],
		isLoading: false,
	},
};

// Error path

// export const ErrorVideoList: Story = {
// 	args: {
// 		error: true,
// 		data: [],
// 		isLoading: false,
// 	},
// };

// // Loading path

// export const LoadingVideoList: Story = {
// 	args: {
// 		error: false,
// 		data: [],
// 		isLoading: true,
// 	},
// };

import type { Meta, StoryObj } from "@storybook/react";
import { LandingPage } from "./LandingPage";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Marketing/Landing Page",
  component: LandingPage,
  parameters: {
    // layout: "centered",
  },
  // tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof LandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

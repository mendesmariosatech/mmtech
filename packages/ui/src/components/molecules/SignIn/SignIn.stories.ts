import { Meta, StoryObj } from "@storybook/react";
import { SignIn } from "./SignIn";
import { fn } from "@storybook/test";

const meta = {
  title: 'Example/SignIn',
  component: SignIn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof SignIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
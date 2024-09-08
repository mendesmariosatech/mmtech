import { Meta, StoryObj } from "@storybook/react";
import { SignUp } from "./SignUp";
import { fn } from "@storybook/test";

const meta = {
  title: 'Example/SignUp',
  component: SignUp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof SignUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
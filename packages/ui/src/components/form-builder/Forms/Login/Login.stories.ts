import { LoginForm } from './LoginForm';
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Forms/Login",
  component: LoginForm,
  argTypes: {},
  args: {},
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    mutate: () => { },
    isPending: true,
    error: null,
  },
};

export const Primary: Story = {
  args: {
    mutate: () => { },
    isPending: false,
    error: null,
  },
};

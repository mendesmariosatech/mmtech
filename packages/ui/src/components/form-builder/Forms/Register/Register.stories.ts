import { Meta, StoryObj } from "@storybook/react";

import { RegisterForm } from "./RegisterForm";

const meta = {
  title: "Forms/Register",
  component: RegisterForm,
  argTypes: {},
  args: {},
} satisfies Meta<typeof RegisterForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
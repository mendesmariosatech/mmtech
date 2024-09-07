import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AuthenticationPage } from './RegisterPage';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/AuthenticationPage',
  component: AuthenticationPage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof AuthenticationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};


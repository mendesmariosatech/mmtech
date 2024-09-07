import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { RegisterPage } from './RegisterPage';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Auth/RegisterPage',
  component: RegisterPage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    handleLogin(email, password) {
      console.log('handleLogin', email, password)
    },
  },
} satisfies Meta<typeof RegisterPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Success: Story = {
  args: {
    handleLogin(email, password) {
      console.log('handleLogin', email, password)
    },
  },
};

export const Error: Story = {
  args: {
    handleLogin(email, password) {
      console.log('handleLogin', email, password)
    },
  },
};


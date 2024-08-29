import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button';

const meta = {
  title: 'Component/Button',
  component: Button,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    // layout: 'fullscreen',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    children: 'Log in',
  },
};


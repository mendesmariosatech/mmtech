import type { Meta, StoryObj } from '@storybook/react';
import { Voting } from './Voting';

const meta = {
  title: 'Voting',
  component: Voting,
} satisfies Meta<typeof Voting>;


export default meta;
type Story = StoryObj<typeof meta>;

export const BaseVoting: Story = {
  args: {
  },
};
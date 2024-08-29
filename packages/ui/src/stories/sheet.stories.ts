import type { Meta, StoryObj } from '@storybook/react';
import { SheetDemo } from '../../components/molecules/SheetDemo';

const meta = {
  title: 'Component/SheetDemo',
  component: SheetDemo,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    // layout: 'fullscreen',
  },
} satisfies Meta<typeof SheetDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SheetDemoStory: Story = {};



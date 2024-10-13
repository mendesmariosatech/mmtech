import type { Meta, StoryObj } from '@storybook/react';
import { ProductsList } from './ProductsList';

const meta = {
  title: 'ProductsList',
  component: ProductsList,
} satisfies Meta<typeof ProductsList>;


export default meta;
type Story = StoryObj<typeof meta>;

export const BaseProductsList: Story = {
  args: {
  },
};
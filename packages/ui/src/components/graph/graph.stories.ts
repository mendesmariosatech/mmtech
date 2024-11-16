import { Meta, StoryObj } from "@storybook/react";
import { iconsNames } from "../iconData/IconData";
import { Component } from "./graph";

const meta = {
	title: "Chart",
	component: Component,
	argTypes: {},
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof Component>;

export const Collapsable: Story = {};

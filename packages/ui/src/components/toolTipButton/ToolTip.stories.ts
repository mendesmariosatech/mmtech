// ToolTipBuilder.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import { ToolTipBuilder } from "./ToolTipBuilder";
import {
	DashboardIcon,
	PersonIcon,
	HomeIcon,
	ReaderIcon,
	CubeIcon,
	CalendarIcon,
	MobileIcon,
	BellIcon,
	HandIcon,
	DesktopIcon,
	CardStackIcon,
	GlobeIcon,
	ExitIcon,
} from "@radix-ui/react-icons";

import {
	ChevronLeft,
	ChevronRight,
	Copy,
	CreditCard,
	File,
	Home, // Importando o ícone corretamente
	LineChart,
	ListFilter,
	MoreVertical,
	Package,
	Package2,
	PanelLeft,
	Search,
	Settings,
	ShoppingCart,
	Truck,
	Users2,
} from "lucide-react";
import { toolTipData } from "./ToolTipData";

const meta = {
	title: "ToolTip",
	component: ToolTipBuilder,
	argTypes: {},
} satisfies Meta<typeof ToolTipBuilder>;

export default meta;

type Story = StoryObj<typeof ToolTipBuilder>;

// Story para ToolTipBuilder com TooltipProvider
export const ToolTipBuilderModel: Story = {
	args: {
		link: toolTipData.link,
		icon: toolTipData.icon,
		label: toolTipData.label,
	},
};

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
} from "@radix-ui/react-icons"; // Importe seus ícones aqui

import {
	ChevronLeft,
	ChevronRight,
	Copy,
	CreditCard,
	File,
	Home,
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
import { LinkFormerProps } from "./LinkFormer";

export const linkButtonData: LinkFormerProps = {
	icon: <Home className="h-5 w-5" />,
	label: "Dashboard",
	link: "/dashboard",
};

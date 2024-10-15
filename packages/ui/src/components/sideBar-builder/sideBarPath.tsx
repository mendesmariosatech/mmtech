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
import { PropsSideBarBuilder } from "./SideBarTypes";

export const buttonsDataStatic: PropsSideBarBuilder = {
	companyName: "Smart Gabinete",
	buttonsData: [
		{
			icon: <Home className="h-5 w-5" />,
			label: "Dashboard",
			disable: false,
			link: "/dashboard",
		},
		{
			icon: <ShoppingCart className="h-5 w-5" />,
			label: "Orders",
			disable: false,
			link: "/orders",
		},
		{
			icon: <Package className="h-5 w-5" />,
			label: "Products",
			disable: false,
			link: "/products",
		},
		{
			icon: <Users2 className="h-5 w-5" />,
			label: "Customers",
			disable: false,
			link: "/customers",
		},
		{
			icon: <LineChart className="h-5 w-5" />,
			label: "Analytics",
			disable: false,
			link: "/analytics",
		},
	],
	buttonConfig: [
		{
			icon: <Settings className="h-5 w-5" />,
			label: "Settings", // Botão de dropdown
			disable: false,
			link: "/settings",
		},
	],
};

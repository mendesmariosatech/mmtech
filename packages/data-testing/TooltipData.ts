import { IconName } from "@repo/ui/components/iconData/IconData";
import { Routes } from "./Routes";

// Define the type for ToolTipData
export const TooltipData = [
	{
		label: "Dashboard",
		disable: false,
		icon: "Home" as IconName,
		link: Routes.client["/client/dashboard"],
	},
	{
		label: "Orders",
		disable: false,
		icon: "ShoppingCart" as IconName,
		link: Routes.client["/ecommerce/orders"],
	},
	{
		label: "Products",
		disable: false,
		icon: "Package" as IconName,
		link: Routes.client["/ecommerce/products"],
	},
	{
		label: "Customers",
		disable: false,
		icon: "Users2" as IconName,
		link: Routes.client["/ecommerce/customers"],
	},
	{
		label: "Analytics",
		disable: false,
		icon: "LineChart" as IconName,
		link: Routes.client["/ecommerce/analytics"],
	},
];

export const ToolTipDataBottom = [
	{
		icon: "Settings" as IconName,
		label: "Settings",
		disable: false,
		link: Routes.client["/settings"],
	},
];

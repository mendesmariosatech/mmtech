"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "../ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { PropsSideBarBuilder } from "./SideBarTypes";
import { Package2, PanelLeft, Settings } from "lucide-react";
import { ToolTipBuilder } from "../toolTipButton/ToolTipBuilder";

export const SideBarStaticFormer = ({
	companyName,
	buttonsData,
	buttonConfig = [],
}: PropsSideBarBuilder) => {
	const pathname = usePathname();

	return (
		<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
			<nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
				<Link
					href="#"
					className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
				>
					<Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
					<span className="sr-only">{companyName}</span>
				</Link>
				{buttonsData.map((button, index) => (
					<ToolTipBuilder
						key={index}
						index={index}
						link={button.link || "#"}
						icon={button.icon}
						label={button.label}
						path={pathname}
					/>
				))}
			</nav>
			<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
				{buttonConfig.map((button, index) => (
					<ToolTipBuilder
						key={index}
						index={index}
						link={button.link || "#"}
						icon={button.icon}
						label={button.label}
						path={pathname}
					/>
				))}
			</nav>
		</aside>
	);
};

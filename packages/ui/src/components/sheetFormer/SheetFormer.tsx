import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { PanelLeft } from "lucide-react";
import { LinkFormer } from "../linkFormer/LinkFormer";
import Image from "next/image";
import { IconName } from "../iconData/IconData";

export interface ButtonConfig {
	label: string;
	icon: string;
	link?: string;
	disable?: boolean;
	onClick?: () => void;
}

export type SheetFormerProps = {
	triggerIcon?: IconName;
	triggerLabel?: string;
	position?: "left" | "right";
	buttonTop?: ButtonConfig[];
	buttonBotton?: ButtonConfig[];
	companyName?: string;
};

const SheetFormer = ({
	triggerIcon,
	triggerLabel,
	position,
	buttonTop = [],
	buttonBotton = [],
	companyName,
}: SheetFormerProps) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="outline" className="sm:hidden">
					<PanelLeft className="h-5 w-5" />
					<span className="sr-only">{triggerLabel}</span>
				</Button>
			</SheetTrigger>
			<SheetContent side={position} className="sm:max-w-xs">
				<nav className="flex flex-col gap-6 text-lg font-medium">
					<Link
						href="/marketing/logo.svg"
						className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full border p-1 text-lg font-semibold md:text-base"
					>
						<Image
							src="/marketing/logo.svg"
							width={36}
							height={36}
							alt="Avatar"
							className="overflow-hidden rounded-full bg-white"
						/>
						<span className="sr-only">{companyName}</span>
					</Link>
					{buttonTop.map((button, index) => (
						<LinkFormer
							key={index}
							link={button.link || "#"}
							icon={button.icon}
							label={button.label}
						/>
					))}
					{buttonBotton.map((button, index) => (
						<LinkFormer
							key={index}
							link={button.link || "#"}
							icon={button.icon}
							label={button.label}
						/>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
};

export default SheetFormer;

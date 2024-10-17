"use client";
import Link from "next/link";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "../ui/tooltip";
import { getIcon } from "../iconData/IconData";

export type ToolTipBuilderProps = {
	link: string;
	icon: string;
	label?: string;
	path?: string;
};

export function ToolTipBuilder({
	link,
	icon,
	label,
	path,
}: ToolTipBuilderProps) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Link
					href={link || "#"}
					className={`flex h-9 w-9 items-center justify-center rounded-lg ${link === path ? `bg-accent` : `bg-none`}  text-muted-foreground hover:text-foreground transition-colors`}
				>
					{getIcon(icon)}
					<span className="sr-only">{label}</span>
				</Link>
			</TooltipTrigger>
			<TooltipContent side="right">{label}</TooltipContent>
		</Tooltip>
	);
}

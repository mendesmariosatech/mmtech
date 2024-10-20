import Link from "next/link";
import { getIcon, IconName } from "../iconData/IconData";
import React from "react";

export type LinkFormerProps = {
	link: string;
	icon: IconName;
	label?: React.ReactNode;
};

export function LinkFormer({ link, icon, label }: LinkFormerProps) {
	return (
		<Link
			href={link}
			className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
		>
			{getIcon(icon)}
			{label}
		</Link>
	);
}

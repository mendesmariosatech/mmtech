import Link from "next/link";
import { getIcon } from "../iconData/IconData";

export type LinkFormerProps = {
	link: string;
	icon: string;
	label?: string;
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

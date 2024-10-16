import Link from "next/link";

export type LinkFormerProps = {
	link: string;
	icon?: React.ReactNode;
	label?: string;
};

export function LinkFormer({ link, icon, label }: LinkFormerProps) {
	return (
		<Link
			href={link}
			className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
		>
			{icon}
			{label}
		</Link>
	);
}

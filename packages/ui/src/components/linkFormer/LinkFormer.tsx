import Link from "next/link";

type LinkFormerProps = {
	link: string;
	icon?: React.ReactNode;
	label?: string;
};

export function LinkButton({ link, icon, label }: LinkFormerProps) {
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

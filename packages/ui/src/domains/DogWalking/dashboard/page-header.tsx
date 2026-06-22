import { SidebarTrigger } from "../../../components/ui/sidebar";

interface PageHeaderProps {
	title: string;
	description?: string;
	action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
	return (
		<header className="flex items-center justify-between border-b bg-background px-6 py-4">
			<div className="flex items-center gap-4">
				<SidebarTrigger className="-ml-2" />
				<div>
					<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
					{description && (
						<p className="text-sm text-muted-foreground">{description}</p>
					)}
				</div>
			</div>
			{action && <div>{action}</div>}
		</header>
	);
}

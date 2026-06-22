"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Footprints, History, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
	{ title: "Home", href: "/employee", icon: Home },
	{ title: "New Walk", href: "/employee/walk", icon: Footprints },
	{ title: "History", href: "/employee/history", icon: History },
	{ title: "Profile", href: "/employee/profile", icon: User },
];

export function EmployeeNav() {
	const pathname = usePathname();

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card">
			<div className="flex items-center justify-around">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"flex flex-1 flex-col items-center gap-1 py-3 text-xs transition-colors",
								isActive ? "text-primary" : "text-muted-foreground",
							)}
						>
							<item.icon className="h-5 w-5" />
							<span>{item.title}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}

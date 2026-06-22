"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dog,
	LayoutDashboard,
	Users,
	UserCircle,
	Footprints,
	FileText,
	DollarSign,
	LogOut,
	ChevronUp,
} from "lucide-react";
import { Company } from "@/lib/types";

const navItems = [
	{ title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
	{ title: "Employees", url: "/dashboard/employees", icon: Users },
	{ title: "Clients", url: "/dashboard/clients", icon: UserCircle },
	{ title: "Walks", url: "/dashboard/walks", icon: Footprints },
	{ title: "Invoices", url: "/dashboard/invoices", icon: FileText },
	{ title: "Payroll", url: "/dashboard/payroll", icon: DollarSign },
];

interface DashboardSidebarProps {
	company: Company;
	userEmail: string;
}

export function DashboardSidebar({
	company,
	userEmail,
}: DashboardSidebarProps) {
	const pathname = usePathname();
	const router = useRouter();

	const handleSignOut = () => {
		router.push("/auth/login");
	};

	return (
		<Sidebar>
			<SidebarHeader className="border-b border-sidebar-border">
				<div className="flex items-center gap-2 px-2 py-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
						<Dog className="h-5 w-5" />
					</div>
					<div className="flex flex-col">
						<span className="text-sm font-semibold">{company.name}</span>
						<span className="text-xs text-sidebar-foreground/70">PawTrack</span>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Management</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild isActive={pathname === item.url}>
										<Link href={item.url}>
											<item.icon className="h-4 w-4" />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<UserCircle className="h-4 w-4" />
									<span className="truncate">{userEmail}</span>
									<ChevronUp className="ml-auto h-4 w-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="w-[--radix-popper-anchor-width]"
							>
								<DropdownMenuItem onClick={handleSignOut}>
									<LogOut className="mr-2 h-4 w-4" />
									Sign out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}

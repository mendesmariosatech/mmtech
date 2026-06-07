"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, hasCompany } from "@/lib/local-auth";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCircle, Footprints, DollarSign } from "lucide-react";

export default function DashboardPage() {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const currentUser = getCurrentUser();
		if (!currentUser) {
			router.push("/auth/login");
			return;
		}

		if (!hasCompany(currentUser)) {
			router.push("/onboarding");
			return;
		}

		setUser(currentUser);
		setLoading(false);
	}, [router]);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				Loading...
			</div>
		);
	}

	if (!user) {
		return null;
	}

	// Mock stats for demo
	const stats = [
		{
			title: "Active Employees",
			value: 3,
			icon: Users,
			color: "text-chart-1",
		},
		{
			title: "Active Clients",
			value: 12,
			icon: UserCircle,
			color: "text-chart-2",
		},
		{
			title: "Total Walks",
			value: 47,
			icon: Footprints,
			color: "text-chart-3",
		},
		{
			title: "Total Revenue",
			value: "$1,245.00",
			icon: DollarSign,
			color: "text-chart-4",
		},
	];

	return (
		<div className="flex flex-col">
			<PageHeader
				title="Dashboard"
				description={`Welcome back, ${user.name}! Here's your ${user.companyName} overview`}
			/>
			<main className="flex-1 p-6">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{stats.map((stat) => (
						<Card key={stat.title}>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium text-muted-foreground">
									{stat.title}
								</CardTitle>
								<stat.icon className={`h-4 w-4 ${stat.color}`} />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{stat.value}</div>
							</CardContent>
						</Card>
					))}
				</div>

				<Card className="mt-6">
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between border-b pb-4">
								<div>
									<p className="font-medium">Buddy - Morning Walk</p>
									<p className="text-sm text-muted-foreground">
										John Doe - walked by Sarah Johnson
									</p>
								</div>
								<div className="text-right">
									<p className="text-sm font-medium">Completed</p>
									<p className="text-xs text-muted-foreground">Today</p>
								</div>
							</div>
							<div className="flex items-center justify-between border-b pb-4">
								<div>
									<p className="font-medium">Max - Afternoon Walk</p>
									<p className="text-sm text-muted-foreground">
										Jane Smith - walked by Mike Wilson
									</p>
								</div>
								<div className="text-right">
									<p className="text-sm font-medium">In Progress</p>
									<p className="text-xs text-muted-foreground">Today</p>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium">Luna - Evening Walk</p>
									<p className="text-sm text-muted-foreground">
										Bob Brown - scheduled with Emma Davis
									</p>
								</div>
								<div className="text-right">
									<p className="text-sm font-medium">Scheduled</p>
									<p className="text-xs text-muted-foreground">Tomorrow</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}

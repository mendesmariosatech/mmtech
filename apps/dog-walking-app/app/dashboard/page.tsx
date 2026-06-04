import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCircle, Footprints, DollarSign } from "lucide-react";

export default async function DashboardPage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	// Get company
	const { data: company } = await supabase
		.from("companies")
		.select("id")
		.eq("owner_id", user!.id)
		.single();

	if (!company) return null;

	// Get stats
	const [
		{ count: employeeCount },
		{ count: clientCount },
		{ count: walkCount },
		{ data: walks },
	] = await Promise.all([
		supabase
			.from("employees")
			.select("*", { count: "exact", head: true })
			.eq("company_id", company.id)
			.eq("is_active", true),
		supabase
			.from("clients")
			.select("*", { count: "exact", head: true })
			.eq("company_id", company.id)
			.eq("is_active", true),
		supabase
			.from("walks")
			.select("*", { count: "exact", head: true })
			.eq("company_id", company.id)
			.eq("status", "completed"),
		supabase
			.from("walks")
			.select("*, client:clients(walk_rate)")
			.eq("company_id", company.id)
			.eq("status", "completed"),
	]);

	const totalRevenue =
		walks?.reduce((sum, walk) => sum + (walk.client?.walk_rate || 0), 0) || 0;

	const stats = [
		{
			title: "Active Employees",
			value: employeeCount || 0,
			icon: Users,
			color: "text-chart-1",
		},
		{
			title: "Active Clients",
			value: clientCount || 0,
			icon: UserCircle,
			color: "text-chart-2",
		},
		{
			title: "Completed Walks",
			value: walkCount || 0,
			icon: Footprints,
			color: "text-chart-3",
		},
		{
			title: "Total Revenue",
			value: `$${totalRevenue.toFixed(2)}`,
			icon: DollarSign,
			color: "text-chart-4",
		},
	];

	// Get recent walks
	const { data: recentWalks } = await supabase
		.from("walks")
		.select("*, client:clients(name, dog_name), employee:employees(name)")
		.eq("company_id", company.id)
		.order("created_at", { ascending: false })
		.limit(5);

	return (
		<div className="flex flex-col">
			<PageHeader
				title="Dashboard"
				description="Overview of your dog walking business"
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
						<CardTitle>Recent Walks</CardTitle>
					</CardHeader>
					<CardContent>
						{recentWalks && recentWalks.length > 0 ? (
							<div className="space-y-4">
								{recentWalks.map((walk) => (
									<div
										key={walk.id}
										className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
									>
										<div>
											<p className="font-medium">{walk.client?.dog_name}</p>
											<p className="text-sm text-muted-foreground">
												{walk.client?.name} - walked by {walk.employee?.name}
											</p>
										</div>
										<div className="text-right">
											<p className="text-sm font-medium capitalize">
												{walk.status.replace("_", " ")}
											</p>
											<p className="text-xs text-muted-foreground">
												{new Date(walk.started_at).toLocaleDateString()}
											</p>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className="text-center text-muted-foreground py-8">
								No walks yet. Add employees and clients to get started!
							</p>
						)}
					</CardContent>
				</Card>
			</main>
		</div>
	);
}

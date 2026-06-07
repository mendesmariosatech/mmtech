import { db, schema } from "@/lib/db";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCircle, Footprints, DollarSign } from "lucide-react";
import { eq, count, desc } from "drizzle-orm";
import { getCurrentUser, getUserCompany } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	// Get current authenticated user
	const user = await getCurrentUser();
	if (!user) {
		redirect("/auth/login");
	}

	// Get user's company
	const company = await getUserCompany(user.id);
	if (!company) {
		// Redirect to company setup if no company exists
		redirect("/onboarding");
	}

	// Get stats
	const [employeeCount, clientCount, walkCount, completedWalks] =
		await Promise.all([
			db
				.select({ count: count() })
				.from(schema.dogWalkingEmployees)
				.where(eq(schema.dogWalkingEmployees.company_id, company.id))
				.then((result) => result[0]?.count || 0),
			db
				.select({ count: count() })
				.from(schema.dogWalkingClients)
				.where(eq(schema.dogWalkingClients.company_id, company.id))
				.then((result) => result[0]?.count || 0),
			db
				.select({ count: count() })
				.from(schema.dogWalkingWalks)
				.where(eq(schema.dogWalkingWalks.company_id, company.id))
				.then((result) => result[0]?.count || 0),
			db
				.select()
				.from(schema.dogWalkingWalks)
				.leftJoin(
					schema.dogWalkingClients,
					eq(schema.dogWalkingWalks.client_id, schema.dogWalkingClients.id),
				)
				.where(eq(schema.dogWalkingWalks.company_id, company.id)),
		]);

	const totalRevenue =
		completedWalks.reduce(
			(sum, { dog_walking_clients }) =>
				sum + (dog_walking_clients?.walk_rate || 0),
			0,
		) || 0;

	const stats = [
		{
			title: "Active Employees",
			value: employeeCount,
			icon: Users,
			color: "text-chart-1",
		},
		{
			title: "Active Clients",
			value: clientCount,
			icon: UserCircle,
			color: "text-chart-2",
		},
		{
			title: "Total Walks",
			value: walkCount,
			icon: Footprints,
			color: "text-chart-3",
		},
		{
			title: "Total Revenue",
			value: `$${(totalRevenue / 100).toFixed(2)}`,
			icon: DollarSign,
			color: "text-chart-4",
		},
	];

	// Get recent walks
	const recentWalks = await db
		.select()
		.from(schema.dogWalkingWalks)
		.leftJoin(
			schema.dogWalkingClients,
			eq(schema.dogWalkingWalks.client_id, schema.dogWalkingClients.id),
		)
		.leftJoin(
			schema.dogWalkingEmployees,
			eq(schema.dogWalkingWalks.employee_id, schema.dogWalkingEmployees.id),
		)
		.where(eq(schema.dogWalkingWalks.company_id, company.id))
		.orderBy(desc(schema.dogWalkingWalks.createdAt))
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
								{recentWalks.map(
									({
										dog_walking_walks,
										dog_walking_clients,
										dog_walking_employees,
									}) => (
										<div
											key={dog_walking_walks.id}
											className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
										>
											<div>
												<p className="font-medium">
													{dog_walking_clients?.dog_name}
												</p>
												<p className="text-sm text-muted-foreground">
													{dog_walking_clients?.name} - walked by{" "}
													{dog_walking_employees?.name}
												</p>
											</div>
											<div className="text-right">
												<p className="text-sm font-medium capitalize">
													{dog_walking_walks.status.replace("_", " ")}
												</p>
												<p className="text-xs text-muted-foreground">
													{new Date(
														dog_walking_walks.started_at,
													).toLocaleDateString()}
												</p>
											</div>
										</div>
									),
								)}
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

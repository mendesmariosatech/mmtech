import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dog, Footprints, Clock } from "lucide-react";
import Link from "next/link";

export default async function EmployeeHomePage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: employee } = await supabase
		.from("employees")
		.select("*, company:companies(name)")
		.eq("user_id", user!.id)
		.single();

	if (!employee) return null;

	// Get today's walks
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const { data: todayWalks } = await supabase
		.from("walks")
		.select("*, client:clients(name, dog_name)")
		.eq("employee_id", employee.id)
		.gte("started_at", today.toISOString())
		.order("started_at", { ascending: false });

	// Check for active walk
	const { data: activeWalk } = await supabase
		.from("walks")
		.select("*, client:clients(name, dog_name, address)")
		.eq("employee_id", employee.id)
		.eq("status", "in_progress")
		.single();

	const completedToday =
		todayWalks?.filter((w) => w.status === "completed").length || 0;

	return (
		<div className="p-4">
			<div className="mb-6">
				<h1 className="text-2xl font-bold">
					Hello, {employee.name.split(" ")[0]}!
				</h1>
				<p className="text-muted-foreground">{employee.company?.name}</p>
			</div>

			{activeWalk && (
				<Card className="mb-4 border-primary bg-primary/5">
					<CardHeader className="pb-2">
						<CardTitle className="flex items-center gap-2 text-primary">
							<Clock className="h-5 w-5 animate-pulse" />
							Walk in Progress
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="font-medium">{activeWalk.client?.dog_name}</p>
						<p className="text-sm text-muted-foreground">
							{activeWalk.client?.name}
						</p>
						<Button asChild className="mt-3 w-full">
							<Link href="/employee/walk">Continue Walk</Link>
						</Button>
					</CardContent>
				</Card>
			)}

			<div className="grid grid-cols-2 gap-4 mb-6">
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-6">
						<Footprints className="h-8 w-8 text-primary mb-2" />
						<p className="text-3xl font-bold">{completedToday}</p>
						<p className="text-sm text-muted-foreground">Walks Today</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-6">
						<Dog className="h-8 w-8 text-accent mb-2" />
						<p className="text-3xl font-bold">{todayWalks?.length || 0}</p>
						<p className="text-sm text-muted-foreground">Total Today</p>
					</CardContent>
				</Card>
			</div>

			{!activeWalk && (
				<Button asChild size="lg" className="w-full h-14 text-lg">
					<Link href="/employee/walk">
						<Footprints className="mr-2 h-5 w-5" />
						Start New Walk
					</Link>
				</Button>
			)}

			{todayWalks && todayWalks.length > 0 && (
				<Card className="mt-6">
					<CardHeader>
						<CardTitle className="text-lg">{"Today's Walks"}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{todayWalks.slice(0, 5).map((walk) => (
							<div
								key={walk.id}
								className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
							>
								<div>
									<p className="font-medium">{walk.client?.dog_name}</p>
									<p className="text-sm text-muted-foreground">
										{walk.client?.name}
									</p>
								</div>
								<div className="text-right">
									<p className="text-sm font-medium capitalize">
										{walk.status === "completed"
											? "Done"
											: walk.status.replace("_", " ")}
									</p>
									<p className="text-xs text-muted-foreground">
										{new Date(walk.started_at).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</p>
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			)}
		</div>
	);
}

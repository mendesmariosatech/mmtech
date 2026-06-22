export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default async function HistoryPage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: employee } = await supabase
		.from("employees")
		.select("id")
		.eq("user_id", user!.id)
		.single();

	if (!employee) return null;

	const { data: walks } = await supabase
		.from("walks")
		.select("*, client:clients(name, dog_name)")
		.eq("employee_id", employee.id)
		.order("started_at", { ascending: false })
		.limit(50);

	// Group walks by date
	const groupedWalks: Record<string, typeof walks> = {};
	walks?.forEach((walk) => {
		const date = format(new Date(walk.started_at), "yyyy-MM-dd");
		if (!groupedWalks[date]) {
			groupedWalks[date] = [];
		}
		groupedWalks[date]!.push(walk);
	});

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-6">Walk History</h1>

			{Object.keys(groupedWalks).length === 0 ? (
				<Card>
					<CardContent className="py-12 text-center">
						<p className="text-muted-foreground">No walks recorded yet</p>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-6">
					{Object.entries(groupedWalks).map(([date, dayWalks]) => (
						<div key={date}>
							<h2 className="text-sm font-medium text-muted-foreground mb-3">
								{format(new Date(date), "EEEE, MMMM d, yyyy")}
							</h2>
							<Card>
								<CardContent className="p-0 divide-y">
									{dayWalks?.map((walk) => (
										<div
											key={walk.id}
											className="flex items-center justify-between p-4"
										>
											<div>
												<p className="font-medium">{walk.client?.dog_name}</p>
												<p className="text-sm text-muted-foreground">
													{walk.client?.name}
												</p>
												{walk.notes && (
													<p className="text-xs text-muted-foreground mt-1 line-clamp-1">
														{walk.notes}
													</p>
												)}
											</div>
											<div className="text-right">
												<Badge
													variant="outline"
													className={
														walk.status === "completed"
															? "bg-green-100 text-green-800"
															: ""
													}
												>
													{walk.duration_minutes
														? `${walk.duration_minutes} min`
														: walk.status}
												</Badge>
												<p className="text-xs text-muted-foreground mt-1">
													{format(new Date(walk.started_at), "h:mm a")}
												</p>
											</div>
										</div>
									))}
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

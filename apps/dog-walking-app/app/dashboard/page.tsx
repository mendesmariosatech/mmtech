import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import { Calendar } from "@repo/ui/components/ui/calendar";

export default function DogWalkingDashboard() {
	return (
		<div className="p-6 max-w-7xl mx-auto space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">PawTrack Dashboard</h1>
					<p className="text-gray-600">Manage your dog walking business</p>
				</div>
				<Button>Add New Walk</Button>
			</div>

			{/* Stats Overview */}
			<div className="grid md:grid-cols-4 gap-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Today's Walks</CardTitle>
						<span className="text-lg">🐕</span>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">12</div>
						<p className="text-xs text-muted-foreground">+2 from yesterday</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Dogs</CardTitle>
						<span className="text-lg">🐾</span>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">28</div>
						<p className="text-xs text-muted-foreground">Regular clients</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Weekly Revenue
						</CardTitle>
						<span className="text-lg">💰</span>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">$1,240</div>
						<p className="text-xs text-muted-foreground">+12% from last week</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Employee Hours
						</CardTitle>
						<span className="text-lg">⏰</span>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">85</div>
						<p className="text-xs text-muted-foreground">This week</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				{/* Today's Schedule */}
				<Card>
					<CardHeader>
						<CardTitle>Today's Schedule</CardTitle>
						<CardDescription>Upcoming walks and appointments</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{[
							{
								time: "9:00 AM",
								client: "Max (Golden Retriever)",
								walker: "Sarah",
								status: "completed",
							},
							{
								time: "11:30 AM",
								client: "Buddy & Luna",
								walker: "Mike",
								status: "in-progress",
							},
							{
								time: "2:00 PM",
								client: "Charlie (Beagle)",
								walker: "Sarah",
								status: "scheduled",
							},
							{
								time: "4:30 PM",
								client: "Bella (Poodle)",
								walker: "Emma",
								status: "scheduled",
							},
						].map((walk, i) => (
							<div
								key={i}
								className="flex items-center justify-between p-3 border rounded-lg"
							>
								<div className="flex items-center gap-3">
									<div className="text-sm font-medium">{walk.time}</div>
									<div>
										<div className="font-medium">{walk.client}</div>
										<div className="text-sm text-gray-600">
											Walker: {walk.walker}
										</div>
									</div>
								</div>
								<Badge
									variant={
										walk.status === "completed"
											? "default"
											: walk.status === "in-progress"
												? "secondary"
												: "outline"
									}
								>
									{walk.status}
								</Badge>
							</div>
						))}
					</CardContent>
				</Card>

				{/* Calendar Integration */}
				<Card>
					<CardHeader>
						<CardTitle>Calendar</CardTitle>
						<CardDescription>Using shared calendar component</CardDescription>
					</CardHeader>
					<CardContent>
						<Calendar mode="single" />
						<div className="mt-4 text-sm text-gray-600">
							<p>
								📅 This calendar uses the shared @repo/ui calendar component
							</p>
							<p>🔗 Integrated with the monorepo's calendar system</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Activity */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Activity</CardTitle>
					<CardDescription>
						Latest updates from your dog walking business
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{[
							"🎯 New client registration: Emma Johnson with 2 dogs",
							"💵 Payment received: $85 from recurring client",
							"🚶 Walk completed: Max's afternoon walk by Sarah",
							"📋 Weekly report generated for client reviews",
							"👋 New walker application: John Smith",
						].map((activity, i) => (
							<div key={i} className="flex items-center gap-3 p-2">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								<span className="text-sm">{activity}</span>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export const dynamic = "force-dynamic";

import { db, schema } from "~/lib/db";
import { eq, and, gte } from "drizzle-orm";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import { SignOutButton } from "@repo/ui/domains/DogWalking/employee";
import { User, Mail, Phone, DollarSign } from "lucide-react";
import { getCurrentUser } from "~/lib/dog-walking-auth";

export default async function ProfilePage() {
	const user = await getCurrentUser();
	if (!user) return null;

	const employee = await db.query.dogWalkingEmployees.findFirst({
		where: eq(schema.dogWalkingEmployees.user_id, user.id),
		with: { company: true },
	});

	if (!employee) return null;

	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

	const walks = await db
		.select({ duration_minutes: schema.dogWalkingWalks.duration_minutes })
		.from(schema.dogWalkingWalks)
		.where(
			and(
				eq(schema.dogWalkingWalks.employee_id, employee.id),
				eq(schema.dogWalkingWalks.status, "completed"),
				gte(schema.dogWalkingWalks.started_at, startOfMonth.toISOString()),
			),
		);

	const monthlyWalks = walks.length;
	const totalMinutes = walks.reduce(
		(sum, w) => sum + (w.duration_minutes || 30),
		0,
	);
	const totalHours = (totalMinutes / 60).toFixed(1);
	const estimatedPay = ((totalMinutes / 60) * employee.hourly_rate).toFixed(2);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-6">Profile</h1>

			<Card className="mb-6">
				<CardHeader>
					<div className="flex items-center gap-4">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
							<User className="h-8 w-8 text-primary" />
						</div>
						<div>
							<CardTitle>{employee.name}</CardTitle>
							<p className="text-sm text-muted-foreground">
								{employee.company?.name}
							</p>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center gap-3">
						<Mail className="h-5 w-5 text-muted-foreground" />
						<span>{employee.email}</span>
					</div>
					{employee.phone && (
						<div className="flex items-center gap-3">
							<Phone className="h-5 w-5 text-muted-foreground" />
							<span>{employee.phone}</span>
						</div>
					)}
					<div className="flex items-center gap-3">
						<DollarSign className="h-5 w-5 text-muted-foreground" />
						<span>${employee.hourly_rate}/hour</span>
					</div>
				</CardContent>
			</Card>

			<Card className="mb-6">
				<CardHeader>
					<CardTitle className="text-lg">This Month</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-3 gap-4 text-center">
						<div>
							<p className="text-2xl font-bold text-primary">{monthlyWalks}</p>
							<p className="text-xs text-muted-foreground">Walks</p>
						</div>
						<div>
							<p className="text-2xl font-bold text-primary">{totalHours}</p>
							<p className="text-xs text-muted-foreground">Hours</p>
						</div>
						<div>
							<p className="text-2xl font-bold text-primary">${estimatedPay}</p>
							<p className="text-xs text-muted-foreground">Estimated</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<SignOutButton />
		</div>
	);
}

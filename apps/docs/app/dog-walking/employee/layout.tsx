export const dynamic = "force-dynamic";

import { db, schema } from "~/lib/db";
import { redirect } from "next/navigation";
import { EmployeeNav } from "@repo/ui/domains/DogWalking/employee";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "~/lib/dog-walking-auth";

export default async function EmployeeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getCurrentUser();
	if (!user) redirect("/dog-walking/auth/login");

	const employees = await db
		.select()
		.from(schema.dogWalkingEmployees)
		.leftJoin(
			schema.dogWalkingCompanies,
			eq(schema.dogWalkingEmployees.company_id, schema.dogWalkingCompanies.id),
		)
		.where(eq(schema.dogWalkingEmployees.user_id, user.id))
		.limit(1);

	if (employees.length === 0) {
		const companies = await db
			.select()
			.from(schema.dogWalkingCompanies)
			.where(eq(schema.dogWalkingCompanies.owner_id, user.id))
			.limit(1);

		if (companies.length > 0) {
			redirect("/dog-walking/dashboard");
		}

		redirect("/dog-walking/onboarding");
	}

	return (
		<div className="flex min-h-svh flex-col bg-background">
			<main className="flex-1 pb-20">{children}</main>
			<EmployeeNav />
		</div>
	);
}

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { EmployeeNav } from "@/components/employee/employee-nav";

export default async function EmployeeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/auth/login");
	}

	// Check if user is an employee
	const { data: employee } = await supabase
		.from("employees")
		.select("*, company:companies(name)")
		.eq("user_id", user.id)
		.single();

	if (!employee) {
		// Not an employee, check if owner
		const { data: company } = await supabase
			.from("companies")
			.select("id")
			.eq("owner_id", user.id)
			.single();

		if (company) {
			redirect("/dashboard");
		}

		// Neither employee nor owner - needs onboarding
		redirect("/onboarding");
	}

	return (
		<div className="flex min-h-svh flex-col bg-background">
			<main className="flex-1 pb-20">{children}</main>
			<EmployeeNav />
		</div>
	);
}

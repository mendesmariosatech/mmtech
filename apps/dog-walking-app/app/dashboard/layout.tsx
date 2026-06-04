import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default async function DashboardLayout({
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

	// Get company for this owner
	const { data: company } = await supabase
		.from("companies")
		.select("*")
		.eq("owner_id", user.id)
		.single();

	if (!company) {
		// Check if user is an employee
		const { data: employee } = await supabase
			.from("employees")
			.select("id")
			.eq("user_id", user.id)
			.single();

		if (employee) {
			redirect("/employee");
		}

		// Neither owner nor employee - needs onboarding
		redirect("/onboarding");
	}

	return (
		<SidebarProvider>
			<DashboardSidebar company={company} userEmail={user.email || ""} />
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	);
}

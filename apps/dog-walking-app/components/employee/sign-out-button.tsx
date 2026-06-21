"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
	const router = useRouter();

	const handleSignOut = async () => {
		const supabase = createClient();
		await supabase.auth.signOut();
		router.push("/auth/login");
	};

	return (
		<Button variant="outline" className="w-full" onClick={handleSignOut}>
			<LogOut className="mr-2 h-4 w-4" />
			Sign Out
		</Button>
	);
}

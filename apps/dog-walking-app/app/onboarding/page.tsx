import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dog } from "lucide-react";
import { getCurrentUser, createUserCompany } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function OnboardingPage() {
	const user = await getCurrentUser();
	if (!user) {
		redirect("/auth/login");
	}

	async function handleCompanyCreation(formData: FormData) {
		"use server";

		const companyName = formData.get("companyName") as string;
		if (!companyName) return;

		try {
			await createUserCompany(user.id, companyName);
			revalidatePath("/dashboard");
			redirect("/dashboard");
		} catch (error) {
			console.error("Error creating company:", error);
			// In a real app, you'd handle this error properly
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
						<Dog className="h-8 w-8 text-primary" />
					</div>
					<CardTitle className="text-2xl">Welcome to PawTrack!</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 text-center">
					<p className="text-muted-foreground">
						Set up your dog walking business to get started with managing
						clients, employees, and walks.
					</p>
					<form action={handleCompanyCreation} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="companyName">Company Name</Label>
							<Input
								id="companyName"
								name="companyName"
								placeholder="Happy Tails Dog Walking"
								required
							/>
						</div>
						<Button type="submit" className="w-full" size="lg">
							Create Your Business
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

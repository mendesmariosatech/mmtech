"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, createCompany, hasCompany } from "@/lib/local-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dog } from "lucide-react";

export default function OnboardingPage() {
	const [user, setUser] = useState<any>(null);
	const [companyName, setCompanyName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const currentUser = getCurrentUser();
		if (!currentUser) {
			router.push("/auth/login");
			return;
		}

		if (hasCompany(currentUser)) {
			router.push("/dashboard");
			return;
		}

		setUser(currentUser);
	}, [router]);

	const handleCompanyCreation = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!companyName.trim()) return;

		setIsLoading(true);
		setError(null);

		try {
			console.log(`Creating company "${companyName}" for user: ${user.name}`);

			const updatedUser = createCompany(user, companyName);
			setUser(updatedUser);

			console.log(`Company created successfully: ${updatedUser.companyName}`);

			// Redirect to dashboard
			router.push("/dashboard");
		} catch (error) {
			console.error("Error creating company:", error);
			setError("Failed to create company. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	if (!user) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				Loading...
			</div>
		);
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
						Hi {user.name}! Set up your dog walking business to get started with
						managing clients, employees, and walks.
					</p>
					<form onSubmit={handleCompanyCreation} className="space-y-4">
						<div className="space-y-2 text-left">
							<Label htmlFor="companyName">Company Name</Label>
							<Input
								id="companyName"
								value={companyName}
								onChange={(e) => setCompanyName(e.target.value)}
								placeholder="Happy Tails Dog Walking"
								required
							/>
						</div>
						{error && <p className="text-sm text-destructive">{error}</p>}
						<Button
							type="submit"
							className="w-full"
							size="lg"
							disabled={isLoading}
						>
							{isLoading ? "Creating Your Business..." : "Create Your Business"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

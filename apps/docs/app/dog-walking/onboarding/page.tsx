"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Dog } from "lucide-react";

export default function OnboardingPage() {
	const [companyName, setCompanyName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleCompanyCreation = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!companyName.trim()) return;

		setIsLoading(true);
		setError(null);

		try {
			router.push("/dog-walking/dashboard");
		} catch (error) {
			console.error("Error creating company:", error);
			setError("Failed to create company. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Dog } from "lucide-react";

export default function OnboardingPage() {
	const [companyName, setCompanyName] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const supabase = createClient();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				setError("You must be logged in");
				return;
			}

			const { error: insertError } = await supabase.from("companies").insert({
				name: companyName,
				owner_id: user.id,
			});

			if (insertError) {
				console.log("[v0] Insert error:", insertError);
				setError(insertError.message);
				return;
			}

			router.push("/dashboard");
			router.refresh();
		} catch (err) {
			console.log("[v0] Error:", err);
			setError("Something went wrong");
		} finally {
			setLoading(false);
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
					<CardDescription>
						{
							"Let's set up your dog walking business. What's your company name?"
						}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="companyName">Company Name</Label>
							<Input
								id="companyName"
								placeholder="e.g., Happy Paws Dog Walking"
								value={companyName}
								onChange={(e) => setCompanyName(e.target.value)}
								required
								minLength={2}
								className="text-base"
							/>
						</div>

						{error && <p className="text-sm text-destructive">{error}</p>}

						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? "Creating..." : "Create My Company"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

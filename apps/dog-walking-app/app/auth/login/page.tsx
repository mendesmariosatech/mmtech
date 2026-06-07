"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dog } from "lucide-react";
import { authenticateUser, setCurrentUser } from "@/lib/local-auth";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			console.log("Login attempt started for:", email);

			// Authenticate user with local auth system
			const user = authenticateUser(email, password);

			if (!user) {
				setError("Invalid email or password");
				return;
			}

			console.log("Login successful for:", user.name);

			// Set current user in localStorage
			setCurrentUser(user);

			// Redirect to dashboard
			router.push("/dashboard");
		} catch (error) {
			console.error("Login error:", error);
			setError("Login failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-svh w-full items-center justify-center bg-background p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className="flex flex-col gap-6">
					<div className="flex items-center justify-center gap-2 text-primary">
						<Dog className="h-8 w-8" />
						<span className="text-2xl font-bold">PawTrack</span>
					</div>
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">Welcome back</CardTitle>
							<CardDescription>
								Sign in to manage your dog walking business
							</CardDescription>
							<div className="text-xs text-muted-foreground bg-muted p-2 rounded">
								Demo: email "demo@example.com", password "password"
							</div>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleLogin}>
								<div className="flex flex-col gap-4">
									<div className="grid gap-2">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											type="email"
											placeholder="you@example.com"
											required
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="password">Password</Label>
										<Input
											id="password"
											type="password"
											required
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
									{error && <p className="text-sm text-destructive">{error}</p>}
									<Button type="submit" className="w-full" disabled={isLoading}>
										{isLoading ? "Signing in..." : "Sign in"}
									</Button>
								</div>
								<div className="mt-4 text-center text-sm">
									{"Don't have an account? "}
									<Link
										href="/auth/sign-up"
										className="text-primary underline underline-offset-4"
									>
										Sign up
									</Link>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

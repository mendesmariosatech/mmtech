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
import { createUser, setCurrentUser } from "@/lib/local-auth";

export default function SignUpPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		if (password.length < 6) {
			setError("Password must be at least 6 characters");
			setIsLoading(false);
			return;
		}

		try {
			console.log("Signup attempt started for:", name, email);

			// Create new user with local auth system
			const user = createUser(name, email, password, companyName);

			console.log("Signup successful for:", user.name);

			// Set current user in localStorage
			setCurrentUser(user);

			// Redirect to dashboard (user already has company from signup)
			router.push("/dashboard");
		} catch (error) {
			console.error("Signup error:", error);
			setError("Signup failed. Please try again.");
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
							<CardTitle className="text-2xl">Create your account</CardTitle>
							<CardDescription>
								Start managing your dog walking business
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSignUp}>
								<div className="flex flex-col gap-4">
									<div className="grid gap-2">
										<Label htmlFor="name">Full Name</Label>
										<Input
											id="name"
											type="text"
											placeholder="John Doe"
											required
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="company">Company Name</Label>
										<Input
											id="company"
											type="text"
											placeholder="Happy Tails Dog Walking"
											required
											value={companyName}
											onChange={(e) => setCompanyName(e.target.value)}
										/>
									</div>
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
									<div className="grid gap-2">
										<Label htmlFor="confirm-password">Confirm Password</Label>
										<Input
											id="confirm-password"
											type="password"
											required
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
									</div>
									{error && <p className="text-sm text-destructive">{error}</p>}
									<Button type="submit" className="w-full" disabled={isLoading}>
										{isLoading ? "Creating account..." : "Create account"}
									</Button>
								</div>
								<div className="mt-4 text-center text-sm">
									Already have an account?{" "}
									<Link
										href="/auth/login"
										className="text-primary underline underline-offset-4"
									>
										Sign in
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

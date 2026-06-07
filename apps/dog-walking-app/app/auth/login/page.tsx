"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Simplified login page to debug the RSC issue
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
			console.log("Simple login attempt for:", email);

			// Simple validation
			if (email === "demo@example.com" && password === "password") {
				console.log("Login successful!");

				// Store user in localStorage
				localStorage.setItem(
					"current-user",
					JSON.stringify({
						id: "demo-user-id",
						name: "Demo Owner",
						email: "demo@example.com",
						companyName: "Demo Dog Walking Co",
					}),
				);

				// Redirect to dashboard
				router.push("/dashboard");
			} else {
				setError("Invalid credentials. Try demo@example.com / password");
			}
		} catch (error) {
			console.error("Login error:", error);
			setError("Login failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="max-w-md w-full">
				<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<h1 className="text-2xl font-bold mb-6 text-center">
						PawTrack Login
					</h1>
					<div className="mb-4 p-2 bg-gray-100 rounded text-sm">
						Demo: demo@example.com / password
					</div>

					<form onSubmit={handleLogin}>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Email
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="demo@example.com"
								required
							/>
						</div>

						<div className="mb-6">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Password
							</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="password"
								required
							/>
						</div>

						{error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

						<div className="flex items-center justify-between">
							<button
								type="submit"
								disabled={isLoading}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
							>
								{isLoading ? "Signing in..." : "Sign In"}
							</button>
						</div>
					</form>

					<div className="mt-4 text-center">
						<a
							href="/auth/sign-up"
							className="text-blue-500 hover:text-blue-800"
						>
							Don't have an account? Sign up
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

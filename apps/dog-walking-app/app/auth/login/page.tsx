"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

			if (email === "demo@example.com" && password === "password") {
				console.log("Login successful!");

				localStorage.setItem(
					"current-user",
					JSON.stringify({
						id: "demo-user-id",
						name: "Demo Owner",
						email: "demo@example.com",
						companyName: "Demo Dog Walking Co",
					}),
				);

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
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "20px",
				backgroundColor: "#f9fafb",
			}}
		>
			<div style={{ maxWidth: "400px", width: "100%" }}>
				<div
					style={{
						backgroundColor: "white",
						boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
						borderRadius: "8px",
						padding: "32px",
					}}
				>
					<h1
						style={{
							fontSize: "24px",
							fontWeight: "bold",
							marginBottom: "24px",
							textAlign: "center",
							color: "#111827",
						}}
					>
						PawTrack Login
					</h1>

					<div
						style={{
							marginBottom: "16px",
							padding: "8px",
							backgroundColor: "#f3f4f6",
							borderRadius: "4px",
							fontSize: "14px",
							color: "#374151",
						}}
					>
						Demo: demo@example.com / password
					</div>

					<form onSubmit={handleLogin}>
						<div style={{ marginBottom: "16px" }}>
							<label
								style={{
									display: "block",
									color: "#374151",
									fontSize: "14px",
									fontWeight: "bold",
									marginBottom: "8px",
								}}
							>
								Email
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								style={{
									width: "100%",
									padding: "8px 12px",
									border: "1px solid #d1d5db",
									borderRadius: "4px",
									fontSize: "16px",
									outline: "none",
								}}
								placeholder="demo@example.com"
								required
							/>
						</div>

						<div style={{ marginBottom: "24px" }}>
							<label
								style={{
									display: "block",
									color: "#374151",
									fontSize: "14px",
									fontWeight: "bold",
									marginBottom: "8px",
								}}
							>
								Password
							</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								style={{
									width: "100%",
									padding: "8px 12px",
									border: "1px solid #d1d5db",
									borderRadius: "4px",
									fontSize: "16px",
									outline: "none",
								}}
								placeholder="password"
								required
							/>
						</div>

						{error && (
							<div
								style={{
									marginBottom: "16px",
									color: "#ef4444",
									fontSize: "14px",
								}}
							>
								{error}
							</div>
						)}

						<button
							type="submit"
							disabled={isLoading}
							style={{
								backgroundColor: isLoading ? "#9ca3af" : "#3b82f6",
								color: "white",
								fontWeight: "bold",
								padding: "12px 16px",
								borderRadius: "4px",
								border: "none",
								cursor: isLoading ? "not-allowed" : "pointer",
								width: "100%",
								fontSize: "16px",
							}}
						>
							{isLoading ? "Signing in..." : "Sign In"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

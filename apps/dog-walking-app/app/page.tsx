"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
	const router = useRouter();

	useEffect(() => {
		router.push("/auth/login");
	}, [router]);

	return (
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "20px",
			}}
		>
			<div style={{ textAlign: "center" }}>
				<h1
					style={{
						fontSize: "24px",
						fontWeight: "bold",
						marginBottom: "16px",
						color: "#111827",
					}}
				>
					PawTrack
				</h1>
				<p style={{ color: "#6b7280", marginBottom: "16px" }}>
					Redirecting to login...
				</p>
				<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
					<a
						href="/auth/login"
						style={{
							display: "block",
							backgroundColor: "#3b82f6",
							color: "white",
							padding: "8px 16px",
							borderRadius: "4px",
							textDecoration: "none",
						}}
					>
						Go to Login
					</a>
					<a
						href="/dashboard"
						style={{
							display: "block",
							backgroundColor: "#10b981",
							color: "white",
							padding: "8px 16px",
							borderRadius: "4px",
							textDecoration: "none",
						}}
					>
						Go to Dashboard
					</a>
				</div>
			</div>
		</div>
	);
}

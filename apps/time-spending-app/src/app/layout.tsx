import "@repo/ui/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Time Spending Tracker",
	description:
		"A cyberpunk-themed time management app where every minute costs $60 from your daily $86,400 budget",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="dark">
			<body className="min-h-screen bg-background font-mono antialiased matrix-bg">
				{children}
			</body>
		</html>
	);
}

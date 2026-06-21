import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Time Spending Tracker",
	description: "Track how you spend your time with a daily budget metaphor",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="dark">
			<body>{children}</body>
		</html>
	);
}

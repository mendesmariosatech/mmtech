import "@repo/ui/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Property Investment Tracker",
	description: "Track and analyze rental property investments",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}

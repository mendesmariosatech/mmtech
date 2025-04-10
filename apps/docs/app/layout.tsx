import "@repo/ui/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@repo/hook-services";
import { Toaster } from "@repo/ui/components/ui/sonner";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Docs",
	description: "Generated by create turbo",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="en">
			<head>
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
			</head>
			<QueryProvider>
				<TooltipProvider>
					<body className={inter.className}>
						{children}
						<Toaster />
					</body>
				</TooltipProvider>
			</QueryProvider>
		</html>
	);
}

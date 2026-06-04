import "@repo/ui/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@repo/hook-services";
import { Toaster } from "@repo/ui/components/ui/sonner";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "PawTrack - Dog Walking Business Management",
	description:
		"Manage your dog walking business with ease. Track walks, employees, clients, and billing all in one place.",
	icons: {
		icon: [
			{
				url: "/icon-light-32x32.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/icon-dark-32x32.png",
				media: "(prefers-color-scheme: dark)",
			},
			{
				url: "/icon.svg",
				type: "image/svg+xml",
			},
		],
		apple: "/apple-icon.png",
	},
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

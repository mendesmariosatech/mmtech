"use client";
import type { Metadata } from "next";
import { LoginForm } from "@repo/ui/components/form-builder/Forms/Login/LoginForm";

export const metadata: Metadata = {
	title: "Authentication",
	description: "Authentication forms built using the components.",
};

const texts = {
	EN: {
		companyName: "MM Tech",
		title: `"This library has saved me countless hours of work and
						helped me deliver stunning designs to my clients faster than
						ever"`,
		createAccount: "Login to your account",
		enterEmail: "Enter your email below",
		dontHaveAccount: "Don't have an account? ",
	}
}
export function LoginPage() {
	return (
		<div>
			<div className="md:hidden">
			</div>
			<div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<div className="absolute inset-0 bg-zinc-900" />
					<div className="relative z-20 flex items-center text-lg font-medium">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-2 h-6 w-6"
						>
							<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
						</svg>
						{texts.EN.companyName}
					</div>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg">
								{texts.EN.title}
							</p>
							<footer className="text-sm">John Doe</footer>
						</blockquote>
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								{texts.EN.createAccount}
							</h1>
							<p className="text-sm text-muted-foreground">
								{texts.EN.enterEmail}
							</p>
						</div>
						<LoginForm
							error={null}
							isPending={false}
							mutate={() => { }}
						/>
						<p className="px-8 text-center text-sm text-muted-foreground">
							{texts.EN.dontHaveAccount}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

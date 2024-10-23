"use client";
import type { Metadata } from "next";
import { LoginForm } from "@repo/ui/components/form-builder/Forms/Login/LoginForm";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@repo/ui/components/ui/Logo";
import { useLogin } from "@repo/hook-services";
import { LinkFormer } from "@repo/ui/components/linkFormer/LinkFormer";

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
		dontHaveAccount: "Don't have an account? Register.",
	},
};
export function LoginPage() {
	const { mutateAsync: login, error, isPending } = useLogin();
	return (
		<div>
			<div className="md:hidden"></div>
			<div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<div className="absolute inset-0 bg-zinc-900" />
					<Logo />
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg">{texts.EN.title}</p>
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
						<LoginForm error={error} isPending={isPending} mutate={login} />
						<Link href="/auth/register">
							<p className="px-8 text-center text-sm text-muted-foreground">
								{texts.EN.dontHaveAccount}
							</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

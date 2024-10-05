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
		createAccount: "Create an account",
		enterEmail: "Enter your email below to create your account",
		terms: "By clicking continue, you agree to our terms and conditions"
	}
}
export function LoginPage() {
	return (
		<>
			<div className="md:hidden">
				{/* <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        /> */}
			</div>
			<div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				{/* <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link> */}
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
							{texts.EN.terms}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

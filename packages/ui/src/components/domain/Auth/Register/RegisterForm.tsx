"use client";

import { cn } from "@repo/ui/lib/utils";
import * as React from "react";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Button } from "../../../ui/button";
import { Loader } from "lucide-react";
interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {
	handleLogIn: (email: string, password: string) => Promise<void>;
	// isloading: boolean;
}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();

		console.log("onSubmit");
		props.handleLogIn(email, password);
	}

	return (
		<div className={cn("grid gap-6 border-2 bg-purple-200", className)} {...props}>
			{/* <form > */}
			<div className="grid gap-2">
				<div className="grid gap-1">
					<Label className="sr-only" htmlFor="email">
						Email
					</Label>
					<Input
						id="email"
						placeholder="name@example.com"
						type="email"
						autoCapitalize="none"
						autoComplete="email"
						autoCorrect="off"
						onChange={(e) => setEmail(e.target.value)}
						// disabled={props.isloading}
						value={email}
					/>
					<Input
						id="password"
						placeholder="######"
						type="password"
						autoCapitalize="none"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					// disabled={props.isloading}
					/>
				</div>
				<Button
					onClick={onSubmit}
				// disabled={props.isloading}
				>
					{true && <Loader />}
					Sign In with Email Text
				</Button>
			</div>
			{/* </form> */}
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<Button
				variant="outline"
				type="button"
			// disabled={props.isloading}
			// onClick={onSubmit}
			>
				{true ? <Loader /> : null} GitHub
			</Button>
		</div>
	);
}

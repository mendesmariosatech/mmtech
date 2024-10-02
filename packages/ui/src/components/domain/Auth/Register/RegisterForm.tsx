"use client";

import { cn } from "@repo/ui/lib/utils";
import * as React from "react";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Button } from "../../../ui/button";
import { Eye, EyeOff, Loader } from "lucide-react";
interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {
	handleLogIn: (email: string, password: string) => Promise<void>;
	isloading: boolean;
}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(false);


	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();

		console.log("onSubmit");
		props.handleLogIn(email, password);
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			{/* <form > */}
			<div className="flex flex-col my-2">
				<div className="flex flex-col gap-1 my-3">
					<Label htmlFor="email">
						E-mail*
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
					<div className="flex justify-between">
						<Label htmlFor="senha">Senha</Label>
						<a
							className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
							href="/login/recuperar-acesso"
							tabIndex={-1}
						>
							esqueceu a senha?
						</a>
					</div>
					<div className="relative">
						<Input
							type={showPassword ? "text" : "password"}
							placeholder=""
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{showPassword ? (
							<Eye
								className="absolute right-2 top-2 cursor-pointer"
								onClick={() => setShowPassword(false)}
							/>
						) : (
							<EyeOff
								className="absolute right-2 top-2 cursor-pointer"
								onClick={() => setShowPassword(true)}
							/>
						)}
					</div>
				</div>
				<Button
					onClick={onSubmit}
					disabled={props.isloading}
				>
					{props.isloading ? (
						<Loader className="animate-spin h-4 w-4 mr-2" />
					) : null}
					Acessar
				</Button>
			</div>
			{/* </form> */}
		</div>
	);
}

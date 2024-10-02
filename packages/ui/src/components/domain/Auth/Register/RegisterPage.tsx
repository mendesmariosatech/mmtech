"use client";
import type { Metadata } from "next";
// import Image from "next/image"
// import Link from "next/link"

// import { cn } from "../../../lib/utils"
// import { buttonVariants } from "../../ui/button"
import { RegisterForm } from "./RegisterForm";
import { Card, CardContent } from "@repo/ui/components/ui/card";

export const metadata: Metadata = {
	title: "Authentication",
	description: "Authentication forms built using the components.",
};

type RegisterPageProps = {
	handleLogIn: (email: string, password: string) => Promise<void>;
	isLoading: boolean;
};

export function RegisterPage({ handleLogIn, isLoading }: RegisterPageProps) {
	return (
		<div className="min-h-screen bg-[#25508C] sm:bg-gray-100 flex flex-col md:flex-row">
			<div className="hidden flex-1 sm:flex flex-col justify-center sm:justify-between p-8 sm:bg-[#25508C]">
				<div>
					<h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-white">
						Sua empresa
					</h1>
				</div>
				<div className="mt-8">
					<blockquote>
						<p className="text-xl font-semibold text-gray-900 sm:text-gray-200">
							"Uma solulação pensada em potencializar o dia a dia da
							administração pública através de soluções tecnológicas."
						</p>
						<footer className="mt-4">
							<p className="text-base font-normal text-gray-500 sm:text-gray-400">
								M&M Tech
							</p>
						</footer>
					</blockquote>
				</div>
			</div>
			<div className="flex-1 flex flex-col justify-center p-4">
				<Card className="w-full max-w-md mx-auto sm:bg-gray-100 sm:border-none shadow-none">
					<CardContent className="mt-8">
						<h2 className="text-2xl font-bold text-gray-900">Acessar painel</h2>
						<p className="mt-2 text-sm text-gray-600">
							Entre com seu e-email e senha abaixo:
						</p>
						<RegisterForm handleLogIn={handleLogIn} isloading={false}></RegisterForm>
						<div className="relative mt-6">
							<div
								aria-hidden="true"
								className="absolute inset-0 flex items-center"
							>
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-gray-100 text-gray-500"></span>
							</div>
						</div>
						<p className="mt-4 text-xs text-gray-500">
							{`Ainda não possui cadastro? `}
							<a
								className="text-blue-800 font-bold hover:underline"
								href="/login/singup"
							>
								Criar nova conta.
							</a>{" "}
						</p>					
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

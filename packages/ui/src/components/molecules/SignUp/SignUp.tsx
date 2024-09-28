'use client'

import * as React from "react"
import { cn } from '@repo/ui/lib/utils'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Card, CardContent } from "../../ui/card"
import { formatarNumeroCelular } from "@repo/ui/lib/formatNumberCell"
import { CheckIcon, LucideEye, LucideEyeOff } from "lucide-react"
import { Checkbox } from "../../ui/checkbox"

export function SignUp() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false)
	const [showPassword, setShowPassword] = React.useState(false);
	const [passwordValidations, setPasswordValidations] = React.useState({
		hasLetter: false,
		hasDigit: false,
		isLongEnough: false,
	});

	const handlePasswordChange = (e: any) => {
		const value = e.target.value;
		const hasLetter = /[A-Z]/.test(value);
		const hasDigit = /\d/.test(value);
		const isLongEnough = value.length >= 8;

		setPasswordValidations({
			hasLetter,
			hasDigit,
			isLongEnough,
		});
	};

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
		}, 3000)
	}

	return (
		<section className="min-h-screen bg-[#25508C] flex items-center">
			<Card className="border-spacing-1 shadow-xl w-full mx-auto max-w-md">
				<div className="flex justify-center m-4">
					<img src="" alt="SUA LOGO AQUI" />
				</div>
				<CardContent className="mt-8">
					<h2 className="text-2xl font-bold text-gray-900">Sobre você</h2>
					<p className="mt-2 text-sm text-gray-600">Preencha os campos abaixo para criar sua conta.</p>
					<form className="mt-2 max-w-lg gap-4 flex flex-col" onSubmit={onSubmit}>
						<div>
							<Label htmlFor="name">Nome</Label>
							<Input
								disabled={isLoading}
								placeholder="Seu nome"></Input>
						</div>
						<div>
							<Label htmlFor="email">E-mail</Label>
							<Input
								disabled={isLoading}
								type="email"
								placeholder="seu@email.com"></Input>
						</div>
						<div>
							<Label htmlFor="phone">Celular</Label>
							<Input
								disabled={isLoading}
								placeholder="(99) 9xxxx-xxxx"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const formattedValue = formatarNumeroCelular(e.target.value);
									e.target.value = formattedValue;
								}}
							></Input>
						</div>
						<div>
							<Label htmlFor="senha">Senha</Label>
							<div className="relative">
								<Input
									type={showPassword ? "text" : "password"}
									placeholder="Crie uma senha forte"
									onChange={(e) => {
										handlePasswordChange(e);
									}}
								/>
								{showPassword ? (
									<LucideEye
										className="absolute right-2 top-2 cursor-pointer"
										onClick={() => setShowPassword(false)}
									/>
								) : (
									<LucideEyeOff
										className="absolute right-2 top-2 cursor-pointer"
										onClick={() => setShowPassword(true)}
									/>
								)}
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox id="terms" />
							<label
								htmlFor="terms"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Eu concordo com os{" "}
								<a className=" text-blue-800 font-bold hover:underline">
									termos de uso
								</a>
							</label>
						</div>
						<div className="ml-2 mt-2">
							<p
								className={
									passwordValidations.hasLetter
										? "text-green-500 flex items-center"
										: "text-red-500"
								}
							>
								{passwordValidations.hasLetter && (
									<CheckIcon className="mr-2" />
								)}
								Ao menos uma letra maiúscula
							</p>
							<p
								className={
									passwordValidations.hasDigit
										? "text-green-500 flex items-center"
										: "text-red-500"
								}
							>
								{passwordValidations.hasDigit && (
									<CheckIcon className="mr-2" />
								)}
								Ao menos um dígito
							</p>
							<p
								className={
									passwordValidations.isLongEnough
										? "text-green-500 flex items-center"
										: "text-red-500"
								}
							>
								{passwordValidations.isLongEnough && (
									<CheckIcon className="mr-2" />
								)}
								8 caracteres ou mais
							</p>
						</div>
						<Button
							onClick={() => setShowPassword(!showPassword)}
							className="mt-4">Cadastrar-se</Button>
					</form>
				</CardContent>
			</Card>
		</section>
	)

}
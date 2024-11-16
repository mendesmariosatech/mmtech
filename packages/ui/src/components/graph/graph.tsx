"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChartContainer, ChartTooltip } from "../ui/chart";

const celebridades = [
	{ nome: "Cristiano Ronaldo", salario: 70_000_000 },
	{ nome: "Messi", salario: 65_000_000 },
	{ nome: "Neymar", salario: 600_00_000 },
	{ nome: "Elon Musk", salario: 2_300_000_000 },
	{ nome: "Eduardo Saverin", salario: 950_000_000 },
];

export function Component() {
	const [salarioUsuario, setSalarioUsuario] = useState<number | null>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		console.log("input", e.currentTarget);
		const salario = Number(formData.get("salario"));
		setSalarioUsuario(salario);
	};

	const dadosGrafico = [
		{ nome: "Você", salario: salarioUsuario || 0 },
		...celebridades,
	];

	const formatarMoeda = (valor: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(valor);
	};

	const calcularDiferenca = (salarioCelebridade: number) => {
		if (!salarioUsuario) return "N/A";
		const diferenca = (salarioCelebridade / salarioUsuario - 1) * 100;
		return diferenca.toFixed(2) + "x";
	};

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle>Comparador de Salários</CardTitle>
				<CardDescription>
					Compare seu salário com o de celebridades
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="mb-6 flex gap-4">
					<Input
						type="number"
						name="salario"
						placeholder="Digite seu salário anual"
						className="flex-grow"
					/>
					<Button type="submit">Comparar</Button>
				</form>

				{salarioUsuario && (
					<>
						<ChartContainer config={{}} className="h-[400px]">
							<BarChart
								data={dadosGrafico}
								layout="vertical"
								margin={{ left: 120 }}
							>
								<CartesianGrid horizontal={false} />
								<XAxis type="number" tickFormatter={formatarMoeda} />
								<YAxis dataKey="nome" type="category" />
								<Tooltip
									formatter={(value: number) => [
										formatarMoeda(value),
										"Salário Anual",
									]}
									labelFormatter={(label) => `Nome: ${label}`}
								/>
								<Bar dataKey="salario" fill="hsl(var(--primary))" />
							</BarChart>
						</ChartContainer>

						<div className="mt-6">
							<h3 className="text-lg font-semibold mb-2">
								Diferença Salarial:
							</h3>
							<ul>
								{celebridades.map((celeb) => (
									<li key={celeb.nome} className="mb-1">
										{celeb.nome}: {calcularDiferenca(celeb.salario)} maior que o
										seu salário
									</li>
								))}
							</ul>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
}

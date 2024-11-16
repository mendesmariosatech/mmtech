"use client";
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "../ui/chart";
import { formatarMoeda } from "./formatCurrency";

type Pessoa = {
	name: string;
	valor: number;
};

const data: Record<string, Pessoa> = {
	voce: {
		name: "Alex",
		valor: 165_000,
	},
	outro: {
		name: "Ronaldo",
		valor: 300_000,
	},
} as const;

const chartConfig = {
	voce: {
		label: "Voce",
		color: "hsl(var(--chart-1))",
	},
	outro: {
		label: "Ronaldo \b",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

const chartData = [{ voce: 150_000, outro: 300_000_100 }] as const;

const calcularDiferenca = (
	salarioUsuario: number,
	salarioCelebridade: number,
) => {
	if (!salarioUsuario) return "N/A";
	const diferenca = (salarioCelebridade / salarioUsuario - 1) * 100;
	return diferenca.toLocaleString() + " %";
};

export function Circle() {
	// quantas vezes a mais que a pessoa?
	const totalVisitors =
		(chartData?.[0]?.voce || 0) + (chartData?.[0]?.outro || 0);

	const me = chartData?.[0]?.voce || 0;
	const other = chartData?.[0]?.outro || 0;

	const remainder = other % me;

	// O QUE EU QUERO CALCULAR EH o ramainder da divisao. se a pessoa eh exatamente mais rica ou uns quebrado

	const realChartData = [{ voce: chartData[0].voce, outro: remainder }];

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Person X is</CardTitle>
				<CardDescription>
					<div className="flex items-center gap-2 font-medium leading-none">
						{`${calcularDiferenca(me, other)} richer than Y`}{" "}
						<TrendingUp className="h-4 w-4" />
						and
					</div>
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-1 items-center pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square w-full max-w-[250px]"
				>
					<RadialBarChart
						data={realChartData}
						endAngle={180}
						innerRadius={90}
						outerRadius={130}
					>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) - 16}
													className="fill-foreground text-lg font-bold"
												>
													{formatarMoeda(remainder)}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 4}
													className="fill-muted-foreground"
												>
													Resto
												</tspan>
											</text>
										);
									}
								}}
							/>
						</PolarRadiusAxis>
						<RadialBar
							dataKey="voce"
							stackId="a"
							cornerRadius={5}
							fill="var(--color-voce)"
							className="stroke-transparent stroke-2"
						/>
						<RadialBar
							dataKey="outro"
							fill="var(--color-outro)"
							stackId="a"
							cornerRadius={5}
							className="stroke-transparent stroke-2"
						/>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="leading-none text-muted-foreground"></div>
			</CardFooter>
		</Card>
	);
}

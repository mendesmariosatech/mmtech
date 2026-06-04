"use client";

import { Property, PropertyCalculations } from "@repo/zod-types";
import { Button } from "@repo/ui/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import {
	Trash2,
	Edit,
	MapPin,
	Home,
	DollarSign,
	TrendingUp,
	TrendingDown,
} from "lucide-react";

interface PropertyWithCalculations extends Property {
	calculations: PropertyCalculations;
}

interface PropertyListProps {
	properties: PropertyWithCalculations[];
	onEdit: (property: Property) => void;
	onDelete: (id: string) => void;
}

export function PropertyList({
	properties,
	onEdit,
	onDelete,
}: PropertyListProps) {
	if (properties.length === 0) {
		return (
			<Card>
				<CardContent className="py-8">
					<div className="text-center text-muted-foreground">
						<Home className="mx-auto h-12 w-12 mb-4 opacity-50" />
						<p className="text-lg">No properties added yet</p>
						<p className="text-sm">
							Add your first property to start analyzing investments
						</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		}).format(amount);
	};

	const formatPercentage = (percentage: number) => {
		return `${percentage.toFixed(2)}%`;
	};

	return (
		<div className="grid gap-6">
			{properties.map((property) => (
				<Card key={property.id} className="overflow-hidden">
					<CardHeader className="pb-4">
						<div className="flex justify-between items-start">
							<div className="flex-1">
								<CardTitle className="text-xl mb-2">
									{property.address}
								</CardTitle>
								<div className="flex items-center text-muted-foreground text-sm mb-2">
									<MapPin className="h-4 w-4 mr-1" />
									{property.city}, {property.state} {property.zipCode}
								</div>
								<div className="flex gap-2 text-sm text-muted-foreground">
									<span>{property.bedrooms}bd</span>
									<span>•</span>
									<span>{property.bathrooms}ba</span>
									<span>•</span>
									<span>{property.sqft.toLocaleString()} sqft</span>
									<span>•</span>
									<span className="capitalize">
										{property.propertyType.replace("_", " ")}
									</span>
								</div>
							</div>

							<div className="flex items-center gap-2">
								<div className="text-right">
									<p className="text-2xl font-bold text-foreground">
										{formatCurrency(property.purchasePrice)}
									</p>
									<p className="text-sm text-muted-foreground">
										{formatCurrency(property.monthlyRent)}/month rent
									</p>
								</div>
								<div className="flex flex-col gap-1 ml-4">
									<Button
										variant="outline"
										size="sm"
										onClick={() => onEdit(property)}
									>
										<Edit className="h-4 w-4" />
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() => property.id && onDelete(property.id)}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>
					</CardHeader>

					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{/* Financial Performance */}
							<div className="space-y-3">
								<h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
									Cash Flow
								</h4>
								<div className="space-y-2">
									<div className="flex justify-between">
										<span className="text-sm">Monthly</span>
										<span
											className={`font-semibold ${property.calculations.monthlyCashFlow >= 0 ? "text-green-600" : "text-red-600"}`}
										>
											{formatCurrency(property.calculations.monthlyCashFlow)}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-sm">Annual</span>
										<span
											className={`font-semibold ${property.calculations.annualCashFlow >= 0 ? "text-green-600" : "text-red-600"}`}
										>
											{formatCurrency(property.calculations.annualCashFlow)}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-sm">NOI</span>
										<span className="font-semibold">
											{formatCurrency(property.calculations.annualNOI)}
										</span>
									</div>
								</div>
							</div>

							{/* Investment Metrics */}
							<div className="space-y-3">
								<h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
									Returns
								</h4>
								<div className="space-y-2">
									<div className="flex justify-between">
										<span className="text-sm">Cap Rate</span>
										<span className="font-semibold">
											{formatPercentage(property.calculations.capRate)}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-sm">Cash-on-Cash</span>
										<span className="font-semibold">
											{formatPercentage(property.calculations.cashOnCashReturn)}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-sm">Rent-to-Price</span>
										<span className="font-semibold">
											{formatPercentage(property.calculations.rentToPrice)}
										</span>
									</div>
								</div>
							</div>

							{/* Monthly Breakdown */}
							<div className="space-y-3">
								<h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
									Monthly Breakdown
								</h4>
								<div className="space-y-2">
									<div className="flex justify-between">
										<span className="text-sm">Gross Income</span>
										<span className="font-semibold text-green-600">
											{formatCurrency(property.calculations.totalMonthlyIncome)}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-sm">Mortgage</span>
										<span className="font-semibold text-red-600">
											-{formatCurrency(property.calculations.monthlyMortgage)}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-sm">Total Expenses</span>
										<span className="font-semibold text-red-600">
											-
											{formatCurrency(
												property.calculations.totalMonthlyExpenses -
													property.calculations.monthlyMortgage,
											)}
										</span>
									</div>
								</div>
							</div>

							{/* Investment Rules */}
							<div className="space-y-3">
								<h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
									Investment Rules
								</h4>
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										{property.calculations.onePercentRule ? (
											<TrendingUp className="h-4 w-4 text-green-600" />
										) : (
											<TrendingDown className="h-4 w-4 text-red-600" />
										)}
										<Badge
											variant={
												property.calculations.onePercentRule
													? "default"
													: "destructive"
											}
										>
											1% Rule
										</Badge>
									</div>
									<div className="flex items-center gap-2">
										{property.calculations.twoPercentRule ? (
											<TrendingUp className="h-4 w-4 text-green-600" />
										) : (
											<TrendingDown className="h-4 w-4 text-red-600" />
										)}
										<Badge
											variant={
												property.calculations.twoPercentRule
													? "default"
													: "destructive"
											}
										>
											2% Rule
										</Badge>
									</div>
									<div className="flex items-center gap-2">
										{property.calculations.fiftyPercentRule ? (
											<TrendingUp className="h-4 w-4 text-green-600" />
										) : (
											<TrendingDown className="h-4 w-4 text-red-600" />
										)}
										<Badge
											variant={
												property.calculations.fiftyPercentRule
													? "default"
													: "destructive"
											}
										>
											50% Rule
										</Badge>
									</div>
									<div className="text-xs text-muted-foreground mt-2">
										<p>
											DSCR:{" "}
											{property.calculations.debtServiceCoverage.toFixed(2)}
										</p>
										<p>GRM: {property.calculations.grm.toFixed(1)}</p>
									</div>
								</div>
							</div>
						</div>

						{property.notes && (
							<div className="mt-6 pt-4 border-t">
								<h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
									Notes
								</h4>
								<p className="text-sm text-muted-foreground">
									{property.notes}
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			))}
		</div>
	);
}

"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CreatePropertySchema,
	PropertySchema,
	type Property,
	type CreateProperty,
	type PropertyCalculations,
	PropertyTypeEnum,
} from "@repo/zod-types";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { calculatePropertyMetrics } from "./calculations";

interface PropertyFormProps {
	onSubmit: (property: Property, calculations: PropertyCalculations) => void;
	initialData?: Property;
}

export function PropertyForm({ onSubmit, initialData }: PropertyFormProps) {
	const [calculations, setCalculations] = useState<PropertyCalculations | null>(
		null,
	);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
		reset,
	} = useForm<CreateProperty>({
		resolver: zodResolver(CreatePropertySchema),
		defaultValues: initialData || {
			address: "",
			city: "",
			state: "",
			zipCode: "",
			propertyType: "single_family",
			bedrooms: 3,
			bathrooms: 2,
			sqft: 1200,
			lotSize: 0,
			purchasePrice: 250000,
			downPayment: 20,
			interestRate: 7,
			loanTerm: 30,
			monthlyRent: 2000,
			otherMonthlyIncome: 0,
			monthlyHOA: 0,
			monthlyMaintenance: 0,
			monthlyVacancy: 0,
			monthlyCapex: 0,
			monthlyPropertyManagement: 0,
			notes: "",
		},
	});

	const watchedValues = watch();

	useEffect(() => {
		const calculationInputs = {
			purchasePrice: watchedValues.purchasePrice,
			downPayment: watchedValues.downPayment,
			interestRate: watchedValues.interestRate,
			loanTerm: watchedValues.loanTerm,
			monthlyRent: watchedValues.monthlyRent,
			otherMonthlyIncome: watchedValues.otherMonthlyIncome || 0,
			monthlyTaxes: watchedValues.monthlyTaxes || 0,
			monthlyInsurance: watchedValues.monthlyInsurance || 0,
			monthlyHOA: watchedValues.monthlyHOA || 0,
			monthlyMaintenance: watchedValues.monthlyMaintenance || 0,
			monthlyVacancy: watchedValues.monthlyVacancy || 0,
			monthlyCapex: watchedValues.monthlyCapex || 0,
			monthlyPropertyManagement: watchedValues.monthlyPropertyManagement || 0,
			closingCosts: 2,
		};

		if (
			calculationInputs.purchasePrice > 0 &&
			calculationInputs.monthlyRent > 0
		) {
			const newCalculations = calculatePropertyMetrics(calculationInputs);
			setCalculations(newCalculations);
		}
	}, [watchedValues]);

	const onFormSubmit = (data: CreateProperty) => {
		if (!calculations) return;

		const property: Property = {
			...data,
			id: initialData?.id || crypto.randomUUID(),
			createdAt: initialData?.createdAt || new Date(),
			updatedAt: new Date(),
		};

		onSubmit(property, calculations);

		if (!initialData) {
			reset();
			setCalculations(null);
		}
	};

	return (
		<form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Property Information</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="md:col-span-2">
						<Label htmlFor="address">Address</Label>
						<Input
							id="address"
							{...register("address")}
							placeholder="123 Main Street"
						/>
						{errors.address && (
							<p className="text-sm text-destructive mt-1">
								{errors.address.message}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor="city">City</Label>
						<Input id="city" {...register("city")} placeholder="Anytown" />
						{errors.city && (
							<p className="text-sm text-destructive mt-1">
								{errors.city.message}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor="state">State</Label>
						<Input
							id="state"
							{...register("state")}
							placeholder="CA"
							maxLength={2}
						/>
						{errors.state && (
							<p className="text-sm text-destructive mt-1">
								{errors.state.message}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor="zipCode">ZIP Code</Label>
						<Input id="zipCode" {...register("zipCode")} placeholder="12345" />
						{errors.zipCode && (
							<p className="text-sm text-destructive mt-1">
								{errors.zipCode.message}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor="propertyType">Property Type</Label>
						<Select
							onValueChange={(value) => setValue("propertyType", value as any)}
							defaultValue={watchedValues.propertyType}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select property type" />
							</SelectTrigger>
							<SelectContent>
								{PropertyTypeEnum.options.map((type) => (
									<SelectItem key={type} value={type}>
										{type
											.replace("_", " ")
											.replace(/\b\w/g, (l) => l.toUpperCase())}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label htmlFor="bedrooms">Bedrooms</Label>
						<Input
							id="bedrooms"
							type="number"
							{...register("bedrooms", { valueAsNumber: true })}
						/>
					</div>

					<div>
						<Label htmlFor="bathrooms">Bathrooms</Label>
						<Input
							id="bathrooms"
							type="number"
							step="0.5"
							{...register("bathrooms", { valueAsNumber: true })}
						/>
					</div>

					<div>
						<Label htmlFor="sqft">Square Feet</Label>
						<Input
							id="sqft"
							type="number"
							{...register("sqft", { valueAsNumber: true })}
						/>
					</div>

					<div>
						<Label htmlFor="lotSize">Lot Size (optional)</Label>
						<Input
							id="lotSize"
							type="number"
							{...register("lotSize", { valueAsNumber: true })}
						/>
					</div>

					<div>
						<Label htmlFor="yearBuilt">Year Built (optional)</Label>
						<Input
							id="yearBuilt"
							type="number"
							{...register("yearBuilt", { valueAsNumber: true })}
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Financial Information</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<Label htmlFor="purchasePrice">Purchase Price</Label>
						<Input
							id="purchasePrice"
							type="number"
							{...register("purchasePrice", { valueAsNumber: true })}
						/>
					</div>

					<div>
						<Label htmlFor="downPayment">Down Payment (%)</Label>
						<Input
							id="downPayment"
							type="number"
							step="0.1"
							{...register("downPayment", { valueAsNumber: true })}
						/>
					</div>

					<div>
						<Label htmlFor="interestRate">Interest Rate (%)</Label>
						<Input
							id="interestRate"
							type="number"
							step="0.1"
							{...register("interestRate", { valueAsNumber: true })}
						/>
					</div>

					<div>
						<Label htmlFor="loanTerm">Loan Term (years)</Label>
						<Input
							id="loanTerm"
							type="number"
							{...register("loanTerm", { valueAsNumber: true })}
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Monthly Income</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<Label htmlFor="monthlyRent">Monthly Rent</Label>
						<Input
							id="monthlyRent"
							type="number"
							{...register("monthlyRent", { valueAsNumber: true })}
						/>
					</div>

					<div>
						<Label htmlFor="otherMonthlyIncome">Other Income</Label>
						<Input
							id="otherMonthlyIncome"
							type="number"
							{...register("otherMonthlyIncome", { valueAsNumber: true })}
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Monthly Expenses</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<Label htmlFor="monthlyTaxes">Property Taxes</Label>
						<Input
							id="monthlyTaxes"
							type="number"
							{...register("monthlyTaxes", { valueAsNumber: true })}
						/>
					</div>

					<div>
						<Label htmlFor="monthlyInsurance">Insurance</Label>
						<Input
							id="monthlyInsurance"
							type="number"
							{...register("monthlyInsurance", { valueAsNumber: true })}
						/>
					</div>

					<div>
						<Label htmlFor="monthlyHOA">HOA Fees</Label>
						<Input
							id="monthlyHOA"
							type="number"
							{...register("monthlyHOA", { valueAsNumber: true })}
						/>
					</div>

					<div>
						<Label htmlFor="monthlyMaintenance">Maintenance</Label>
						<Input
							id="monthlyMaintenance"
							type="number"
							{...register("monthlyMaintenance", { valueAsNumber: true })}
						/>
					</div>

					<div>
						<Label htmlFor="monthlyVacancy">Vacancy Allowance</Label>
						<Input
							id="monthlyVacancy"
							type="number"
							{...register("monthlyVacancy", { valueAsNumber: true })}
						/>
					</div>

					<div>
						<Label htmlFor="monthlyCapex">Capital Expenditures</Label>
						<Input
							id="monthlyCapex"
							type="number"
							{...register("monthlyCapex", { valueAsNumber: true })}
						/>
					</div>

					<div>
						<Label htmlFor="monthlyPropertyManagement">
							Property Management
						</Label>
						<Input
							id="monthlyPropertyManagement"
							type="number"
							{...register("monthlyPropertyManagement", {
								valueAsNumber: true,
							})}
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Additional Notes</CardTitle>
				</CardHeader>
				<CardContent>
					<Label htmlFor="notes">Notes</Label>
					<Textarea
						id="notes"
						{...register("notes")}
						placeholder="Additional notes about this property..."
						rows={3}
					/>
				</CardContent>
			</Card>

			{calculations && (
				<Card>
					<CardHeader>
						<CardTitle>Investment Analysis Preview</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
							<div>
								<p className="text-muted-foreground">Monthly Cash Flow</p>
								<p
									className={`font-semibold ${calculations.monthlyCashFlow >= 0 ? "text-green-600" : "text-red-600"}`}
								>
									${calculations.monthlyCashFlow.toFixed(0)}
								</p>
							</div>
							<div>
								<p className="text-muted-foreground">Cap Rate</p>
								<p className="font-semibold">
									{calculations.capRate.toFixed(2)}%
								</p>
							</div>
							<div>
								<p className="text-muted-foreground">Cash-on-Cash Return</p>
								<p className="font-semibold">
									{calculations.cashOnCashReturn.toFixed(2)}%
								</p>
							</div>
							<div>
								<p className="text-muted-foreground">1% Rule</p>
								<p
									className={`font-semibold ${calculations.onePercentRule ? "text-green-600" : "text-red-600"}`}
								>
									{calculations.onePercentRule ? "✓ Pass" : "✗ Fail"}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			)}

			<div className="flex gap-4">
				<Button type="submit" disabled={!calculations}>
					{initialData ? "Update Property" : "Add Property"}
				</Button>
			</div>
		</form>
	);
}

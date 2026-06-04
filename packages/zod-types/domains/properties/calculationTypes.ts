import { z } from "zod";

export const PropertyCalculationsSchema = z.object({
	// Monthly calculations
	monthlyMortgage: z.number(),
	totalMonthlyIncome: z.number(),
	totalMonthlyExpenses: z.number(),
	netOperatingIncome: z.number(), // NOI (before debt service)
	monthlyCashFlow: z.number(),

	// Annual calculations
	annualRent: z.number(),
	annualCashFlow: z.number(),
	annualNOI: z.number(),

	// Investment metrics
	capRate: z.number(), // Cap rate percentage
	cashOnCashReturn: z.number(), // Cash-on-cash return percentage
	rentToPrice: z.number(), // Rent-to-price ratio percentage
	debtServiceCoverage: z.number(), // DSCR

	// Investment rules
	onePercentRule: z.boolean(), // Monthly rent >= 1% of purchase price
	twoPercentRule: z.boolean(), // Monthly rent >= 2% of purchase price
	fiftyPercentRule: z.boolean(), // Total expenses <= 50% of rental income

	// Additional metrics
	totalCashInvested: z.number(), // Down payment + closing costs
	breakEvenRatio: z.number(), // Percentage of rental income needed to break even
	grm: z.number(), // Gross Rent Multiplier
});

export const CalculationInputSchema = z.object({
	purchasePrice: z.number().min(0),
	downPayment: z.number().min(0).max(100),
	interestRate: z.number().min(0).max(30),
	loanTerm: z.number().min(1).max(50),
	monthlyRent: z.number().min(0),
	otherMonthlyIncome: z.number().min(0).default(0),
	monthlyTaxes: z.number().min(0).default(0),
	monthlyInsurance: z.number().min(0).default(0),
	monthlyHOA: z.number().min(0).default(0),
	monthlyMaintenance: z.number().min(0).default(0),
	monthlyVacancy: z.number().min(0).default(0),
	monthlyCapex: z.number().min(0).default(0),
	monthlyPropertyManagement: z.number().min(0).default(0),
	closingCosts: z.number().min(0).default(0), // Percentage of purchase price
});

export type PropertyCalculations = z.infer<typeof PropertyCalculationsSchema>;
export type CalculationInput = z.infer<typeof CalculationInputSchema>;

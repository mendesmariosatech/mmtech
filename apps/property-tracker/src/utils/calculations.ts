import { CalculationInput, PropertyCalculations } from "@repo/zod-types";

export function calculatePropertyMetrics(
	input: CalculationInput,
): PropertyCalculations {
	const {
		purchasePrice,
		downPayment,
		interestRate,
		loanTerm,
		monthlyRent,
		otherMonthlyIncome,
		monthlyTaxes,
		monthlyInsurance,
		monthlyHOA,
		monthlyMaintenance,
		monthlyVacancy,
		monthlyCapex,
		monthlyPropertyManagement,
		closingCosts,
	} = input;

	// Loan calculations
	const downPaymentAmount = (purchasePrice * downPayment) / 100;
	const loanAmount = purchasePrice - downPaymentAmount;
	const monthlyInterestRate = interestRate / 100 / 12;
	const numberOfPayments = loanTerm * 12;

	// Monthly mortgage payment (P&I)
	let monthlyMortgage = 0;
	if (monthlyInterestRate > 0) {
		monthlyMortgage =
			(loanAmount *
				monthlyInterestRate *
				Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
			(Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
	} else {
		monthlyMortgage = loanAmount / numberOfPayments;
	}

	// Income calculations
	const totalMonthlyIncome = monthlyRent + otherMonthlyIncome;
	const annualRent = totalMonthlyIncome * 12;

	// Expense calculations
	const totalOperatingExpenses =
		monthlyTaxes +
		monthlyInsurance +
		monthlyHOA +
		monthlyMaintenance +
		monthlyVacancy +
		monthlyCapex +
		monthlyPropertyManagement;

	const totalMonthlyExpenses = monthlyMortgage + totalOperatingExpenses;
	const netOperatingIncome = totalMonthlyIncome - totalOperatingExpenses;
	const annualNOI = netOperatingIncome * 12;

	// Cash flow calculations
	const monthlyCashFlow = totalMonthlyIncome - totalMonthlyExpenses;
	const annualCashFlow = monthlyCashFlow * 12;

	// Investment metrics
	const capRate = purchasePrice > 0 ? (annualNOI / purchasePrice) * 100 : 0;

	const closingCostAmount = (purchasePrice * closingCosts) / 100;
	const totalCashInvested = downPaymentAmount + closingCostAmount;
	const cashOnCashReturn =
		totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;

	const rentToPrice =
		purchasePrice > 0 ? (monthlyRent / purchasePrice) * 100 : 0;

	// Debt service coverage ratio
	const annualDebtService = monthlyMortgage * 12;
	const debtServiceCoverage =
		annualDebtService > 0 ? annualNOI / annualDebtService : 0;

	// Break-even ratio
	const breakEvenRatio =
		totalMonthlyIncome > 0
			? (totalMonthlyExpenses / totalMonthlyIncome) * 100
			: 0;

	// Gross Rent Multiplier
	const grm = monthlyRent > 0 ? purchasePrice / annualRent : 0;

	// Investment rules
	const onePercentRule = rentToPrice >= 1;
	const twoPercentRule = rentToPrice >= 2;
	const fiftyPercentRule = totalOperatingExpenses <= totalMonthlyIncome * 0.5;

	return {
		// Monthly calculations
		monthlyMortgage: Math.round(monthlyMortgage),
		totalMonthlyIncome: Math.round(totalMonthlyIncome),
		totalMonthlyExpenses: Math.round(totalMonthlyExpenses),
		netOperatingIncome: Math.round(netOperatingIncome),
		monthlyCashFlow: Math.round(monthlyCashFlow),

		// Annual calculations
		annualRent: Math.round(annualRent),
		annualCashFlow: Math.round(annualCashFlow),
		annualNOI: Math.round(annualNOI),

		// Investment metrics
		capRate: Math.round(capRate * 100) / 100,
		cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
		rentToPrice: Math.round(rentToPrice * 100) / 100,
		debtServiceCoverage: Math.round(debtServiceCoverage * 100) / 100,

		// Investment rules
		onePercentRule,
		twoPercentRule,
		fiftyPercentRule,

		// Additional metrics
		totalCashInvested: Math.round(totalCashInvested),
		breakEvenRatio: Math.round(breakEvenRatio * 100) / 100,
		grm: Math.round(grm * 100) / 100,
	};
}

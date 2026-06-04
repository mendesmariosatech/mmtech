import { z } from "zod";

export const PropertyTypeEnum = z.enum([
	"single_family",
	"duplex",
	"triplex",
	"fourplex",
	"condo",
	"townhouse",
	"multi_family",
	"commercial",
	"land",
	"other",
]);

export const PropertySchema = z.object({
	id: z.string().uuid().optional(),
	address: z.string().min(1, "Address is required"),
	city: z.string().min(1, "City is required"),
	state: z.string().length(2, "State must be 2 characters"),
	zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
	propertyType: PropertyTypeEnum,

	// Basic property details
	bedrooms: z.number().min(0).max(20),
	bathrooms: z.number().min(0).max(20),
	sqft: z.number().min(0),
	lotSize: z.number().min(0).optional(),
	yearBuilt: z.number().min(1800).max(new Date().getFullYear()).optional(),

	// Financial details
	purchasePrice: z.number().min(0),
	downPayment: z.number().min(0).max(100), // Percentage
	interestRate: z.number().min(0).max(30), // Percentage
	loanTerm: z.number().min(1).max(50), // Years

	// Income
	monthlyRent: z.number().min(0),
	otherMonthlyIncome: z.number().min(0).default(0),

	// Expenses
	monthlyTaxes: z.number().min(0).optional(),
	monthlyInsurance: z.number().min(0).optional(),
	monthlyHOA: z.number().min(0).default(0),
	monthlyMaintenance: z.number().min(0).default(0),
	monthlyVacancy: z.number().min(0).default(0),
	monthlyCapex: z.number().min(0).default(0), // Capital expenditures
	monthlyPropertyManagement: z.number().min(0).default(0),

	// Metadata
	notes: z.string().optional(),
	createdAt: z.date().default(() => new Date()),
	updatedAt: z.date().default(() => new Date()),
});

export const CreatePropertySchema = PropertySchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export const UpdatePropertySchema = PropertySchema.partial().omit({
	createdAt: true,
});

export type Property = z.infer<typeof PropertySchema>;
export type CreateProperty = z.infer<typeof CreatePropertySchema>;
export type UpdateProperty = z.infer<typeof UpdatePropertySchema>;
export type PropertyType = z.infer<typeof PropertyTypeEnum>;

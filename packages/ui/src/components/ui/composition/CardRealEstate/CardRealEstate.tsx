import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../card";
import { Button } from "../../button";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

const properties = [
	{
		id: 1,
		name: "Alliva Priva Jardin",
		price: 88354,
		description:
			"It seems like 'Alliva Priva Jardin' might be a specific real estate .",
		image:
			"https://www.bellacollina.com/hubfs/Real%20Estate/Custom%20Built%20Homes.jpg",
	},
	{
		id: 2,
		name: "Jardin Priva",
		price: 66354,
		description:
			"It seems like 'Alliva Priva Jardin' might be a specific real estate .",
		image:
			"https://www.bellacollina.com/hubfs/Real%20Estate/Custom%20Built%20Homes.jpg",
	},
	{
		id: 3,
		name: "Priva Jardin Alliva",
		price: 47354,
		description:
			"It seems like 'Alliva Priva Jardin' might be a specific real estate .",
		image:
			"https://www.bellacollina.com/hubfs/Real%20Estate/Custom%20Built%20Homes.jpg",
	},
];

export function CardRealEstate() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-4xl font-bold">Best Real Estate Deals</h1>
				<div className="flex space-x-2">
					<Button variant="outline" size="icon">
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button variant="default" size="icon">
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
			<p className="text-muted-foreground mb-8">
				Finding the "best" real estate deals can vary greatly depending on your
				specific criteria, location, budget, and investment goals.
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{properties.map((property) => (
					<Card key={property.id} className="overflow-hidden bg-neutral-50">
						<CardHeader className="p-0">
							<img
								src={property.image}
								alt={property.name}
								className="w-full h-48 object-cover"
							/>
						</CardHeader>
						<CardContent className="p-4">
							<div className="flex justify-between items-start">
								<CardTitle className="text-xl font-semibold">
									{property.name}
								</CardTitle>
								<Button
									variant="ghost"
									size="icon"
									className="text-muted-foreground hover:text-primary"
								>
									<Heart className="h-5 w-5" />
								</Button>
							</div>
							<p className="text-2xl text-orange-500 font-bold text-primary mt-2">
								${property.price.toLocaleString()}
							</p>
							<p className="text-muted-foreground mt-2">
								{property.description}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

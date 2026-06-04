"use client";

import { useState } from "react";
import { PropertyForm } from "../components/PropertyForm";
import { PropertyList } from "../components/PropertyList";
import { PropertyCalculations, Property } from "@repo/zod-types";
import { Button } from "@repo/ui/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@repo/ui/components/ui/tabs";

export default function Page(): JSX.Element {
	const [properties, setProperties] = useState<
		(Property & { calculations: PropertyCalculations })[]
	>([]);
	const [editingProperty, setEditingProperty] = useState<Property | null>(null);

	const handleAddProperty = (
		property: Property,
		calculations: PropertyCalculations,
	) => {
		const newProperty = {
			...property,
			id: crypto.randomUUID(),
			calculations,
		};
		setProperties((prev) => [...prev, newProperty]);
	};

	const handleUpdateProperty = (
		property: Property,
		calculations: PropertyCalculations,
	) => {
		setProperties((prev) =>
			prev.map((p) =>
				p.id === property.id ? { ...property, calculations } : p,
			),
		);
		setEditingProperty(null);
	};

	const handleEditProperty = (property: Property) => {
		setEditingProperty(property);
	};

	const handleDeleteProperty = (id: string) => {
		setProperties((prev) => prev.filter((p) => p.id !== id));
	};

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto py-8 px-4">
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-foreground mb-2">
						Property Investment Tracker
					</h1>
					<p className="text-muted-foreground">
						Analyze rental properties with detailed investment calculations
					</p>
				</div>

				<Tabs defaultValue="add" className="space-y-6">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="add">
							{editingProperty ? "Edit Property" : "Add Property"}
						</TabsTrigger>
						<TabsTrigger value="list">
							Properties ({properties.length})
						</TabsTrigger>
					</TabsList>

					<TabsContent value="add" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>
									{editingProperty ? "Edit Property" : "Add New Property"}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<PropertyForm
									onSubmit={
										editingProperty ? handleUpdateProperty : handleAddProperty
									}
									initialData={editingProperty || undefined}
								/>
								{editingProperty && (
									<div className="mt-4">
										<Button
											variant="outline"
											onClick={() => setEditingProperty(null)}
										>
											Cancel Edit
										</Button>
									</div>
								)}
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="list" className="space-y-6">
						<PropertyList
							properties={properties}
							onEdit={handleEditProperty}
							onDelete={handleDeleteProperty}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

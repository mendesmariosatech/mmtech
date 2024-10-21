"use client";

import {
	ChevronLeft,
	ChevronRight,
	ChevronDown,
	Plus,
	User,
} from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { ptBR } from "date-fns/locale";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import { Separator } from "../ui/separator";

export default function CalendarColumnBuilder() {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<div className="w-72 bg-white shadow-lg min-h-screen">
			<div className="p-4 bg-gray-100 flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
						<User className="text-white w-5 h-5" />
					</div>
					<div>
						<p className="text-sm font-medium">shadcn</p>
						<p className="text-xs text-gray-500">m@example.com</p>
					</div>
				</div>
			</div>
			<div className="w-full">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					className="rounded-md border shadow"
					locale={ptBR}
				/>
			</div>
			<div className="p-4 border-t">
				<Collapsible>
					<CollapsibleTrigger className="flex justify-between items-center mb-2">
						<h3 className="text-sm font-semibold">My Calendars</h3>
						<ChevronRight className="w-4 h-4 text-gray-500" />
					</CollapsibleTrigger>
					<CollapsibleContent>
						<div className="space-y-2">
							<div className="flex items-center">
								<Checkbox id="personal" defaultChecked />
								<label htmlFor="personal" className="text-sm ml-2">
									Personal
								</label>
							</div>
							<div className="flex items-center">
								<Checkbox id="work" defaultChecked />
								<label htmlFor="work" className="text-sm ml-2">
									Work
								</label>
							</div>
							<div className="flex items-center">
								<Checkbox id="family" />
								<label htmlFor="family" className="text-sm ml-2">
									Family
								</label>
							</div>
						</div>
					</CollapsibleContent>
				</Collapsible>
				<Separator />
				<div className="p-4 border-t">
					<div className="flex justify-between items-center mb-2">
						<span className="text-sm font-semibold">Favorites</span>
						<ChevronRight className="w-4 h-4 text-gray-500" />
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm font-semibold">Other</span>
						<ChevronRight className="w-4 h-4 text-gray-500" />
					</div>
				</div>
			</div>
			<div className="p-4 border-t">
				<Button
					variant="outline"
					className="w-full flex items-center justify-center"
				>
					<Plus className="w-4 h-4 mr-2" />
					Adicionar evento
				</Button>
			</div>
		</div>
	);
}

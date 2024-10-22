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
	CollapsableBuilder,
	CollapsibleProps,
} from "../collapsable/CollapsableBuilder";

interface CalendarColumnBuilderProps {
	name: string;
	email: string;
	collapseData: CollapsibleProps;
}

export default function CalendarColumnBuilder({
	name,
	email,
	collapseData,
}: CalendarColumnBuilderProps) {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<div className="w-72 bg-white shadow-lg min-h-screen justify-between flex flex-col">
			<div className="flex flex-col h-full">
				<div className="p-4 bg-gray-100 flex items-center">
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
							<User className="text-white w-5 h-5" />
						</div>
						<div>
							<p className="text-sm font-medium">{name}</p>
							<p className="text-xs text-gray-500">{email}</p>
						</div>
					</div>
				</div>
				<div className="w-full">
					<Calendar
						mode="single"
						selected={date}
						onSelect={setDate}
						className="border shadow"
						locale={ptBR}
					/>
				</div>
				<div className="p-4 border-t">
					<CollapsableBuilder
						title={collapseData.title}
						icon={collapseData.icon}
						items={collapseData.items}
					/>
				</div>
			</div>
			<div className="p-4 border-t ">
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

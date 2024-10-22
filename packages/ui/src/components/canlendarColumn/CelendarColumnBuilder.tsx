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
import { ptBR, enUS } from "date-fns/locale";
import {
	CollapsableBuilder,
	CollapsibleProps,
} from "../collapsable/CollapsableBuilder";
import { CalendarModal } from "./Models/CalendarModal";

type DataEvents = {
	id?: string;
	title?: string;
	start?: Date;
	end?: Date;
	calendar?: string;
};

interface CalendarColumnBuilderProps {
	name: string;
	email: string;
	collapseData: CollapsibleProps;
	colorUser: string;
	eventsData: DataEvents[];
	language: "EN" | "PT";
}

const texts = {
	EN: {
		buttonAdd: "Add event",
		locale: enUS,
	},
	PT: {
		buttonAdd: "Adicionar evento",
		locale: ptBR,
	},
};

export default function CalendarColumnBuilder({
	name,
	email,
	collapseData,
	colorUser,
	language,
}: CalendarColumnBuilderProps) {
	const [date, setDate] = useState<Date>(new Date());
	const [newEvent, setNewEvent] = useState<{
		title: string;
		start: Date;
		end: Date;
		calendar: string;
	}>({
		title: "",
		start: new Date(),
		end: new Date(),
		calendar: "Personal",
	});

	return (
		<div className="hidden w-72 bg-white shadow-lg min-h-screen justify-between md:flex flex-col">
			<div className="flex flex-col h-full">
				<div className="p-4 bg-gray-100 flex items-center">
					<div className="flex items-center space-x-2">
						<div
							className={`w-8 h-8 ${colorUser} rounded-full flex items-center justify-center`}
						>
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
						onSelect={(newDate) => newDate && setDate(newDate)}
						className="border shadow"
						locale={texts[language].locale}
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
			<div className="p-4 border-t">
				<CalendarModal
					language={language}
					title={"Add Event"}
					event={newEvent}
					selectedDate={date} // Adicione esta prop
				>
					<Button className="mb-4 w-full" variant="outline">
						<Plus className="mr-2 h-4 w-4" /> {texts[language].buttonAdd}
					</Button>
				</CalendarModal>
			</div>
		</div>
	);
}

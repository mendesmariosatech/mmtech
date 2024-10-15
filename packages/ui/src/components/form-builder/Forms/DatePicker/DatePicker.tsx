"use client";

import { useState } from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";

import { cn } from "../../../../lib/utils";
import { Button } from "../../../ui/button";
import { Calendar } from "../../../ui/calendar";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../ui/select";
import { useForm } from "react-hook-form";

export function DatePicker() {
	const [date, setDate] = useState<Date>();

	const form = useForm({
		defaultValues: {
			date: undefined,
			time: "",
		},
	});

	function onSubmit(data: { date: Date | undefined; time: string }) {
		// Here you would typically send the data to your backend
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date < new Date() ||
											date >
												new Date(new Date().setMonth(new Date().getMonth() + 2))
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormDescription>
								Select the date for your service appointment.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="time"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-[240px]">
										<SelectValue placeholder="Select a time slot" />
										<Clock className="ml-auto h-4 w-4 opacity-50" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{[9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => (
										<SelectItem key={hour} value={`${hour}:00`}>
											{`${hour}:00`}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								Choose a time slot for your appointment.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Book Appointment</Button>
			</form>
		</Form>
	);
}

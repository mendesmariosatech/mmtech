import { ConfigObject } from "../../form-builder/ControlledInput"; // Ensure the import is correct
import { ModalFields } from "./CalendarModal";

// Define the type for modal fields including the checkbox
interface ConfigModalFields {
	titleEvent: string;
	StartDate: string;
	EndDate: string;
	textAreaLabel: string;
	tagName: string;
	Color: string;
	allDays: string; // Ensure this property is included
}

// Adjust the function to follow the pattern of `ConfigObject`
export const configModal = (
	labels: ConfigModalFields,
	isAllDay: boolean,
): ConfigObject<Omit<ModalFields, "id">> => ({
	titleEvent: {
		name: "titleEvent",
		input: "text",
		label: labels.titleEvent,
		placeholder: "Enter the event title",
	},
	StartDate: {
		name: "StartDate",
		input: isAllDay ? "date" : "datetime-local", // Conditional input type based on all-day event
		label: labels.StartDate, // Label from config or default
		placeholder: labels.StartDate
			? `Select ${labels.StartDate.toLowerCase()}`
			: "Select start date",
	},
	allDays: {
		name: "allDays",
		input: "checkbox",
		checkboxLabel: labels.allDays ? "All Day Event" : "Evento Dia Todo",
		value: isAllDay, // Set the value to true if it's an all-day event
	},
	EndDate: {
		name: "EndDate",
		input: "datetime-local",
		label: labels.EndDate,
		placeholder: labels.EndDate
			? `Select ${labels.EndDate.toLowerCase()}`
			: "Select end date",
		disabled: isAllDay, // Disable end date if it's an all-day event
	},
	textAreaLabel: {
		name: "textAreaLabel",
		input: "textarea", // Ensure textarea is valid in your setup
		label: labels.textAreaLabel,
		placeholder: "Enter event description",
	},
	tagName: {
		name: "tagName",
		input: "text", // Input type for the tag name
		label: "Tag Name", // Label for the tag name field
		placeholder: "Enter tag name", // Placeholder for the tag name field
	},
	Color: {
		name: "Color",
		input: "color",
		label: "Color",
	},
});

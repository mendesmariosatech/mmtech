import { ConfigObject } from "../../form-builder/ControlledInput"; // Ensure the import is correct
import { ModalFields } from "./CalendarModal";

// Define the type for modal fields including the checkbox
interface ConfigModalFields {
	titleEvent: string;
	EventDate: string;
	StartEvent: string;
	EndEvent: string;
	textAreaLabel: string;
	tagName: string;
	Color: string;
}

// Adjust the function to follow the pattern of `ConfigObject`
export const configModal = (
	labels: ConfigModalFields,
): ConfigObject<Omit<ModalFields, "id">> => ({
	titleEvent: {
		name: "titleEvent",
		input: "text",
		label: labels.titleEvent,
		placeholder: "Enter the event title",
	},
	EventDate: {
		name: "EventDate",
		input: "date", // Conditional input type based on all-day event
		label: labels.EventDate, // Label from config or default
		placeholder: labels.EventDate
			? `Select ${labels.EventDate.toLowerCase()}`
			: "Select date",
	},
	StartEvent: {
		name: "StartEvent",
		input: "time", // Conditional input type based on all-day event
		label: labels.StartEvent, // Label from config or default
		placeholder: labels.StartEvent
			? `Select ${labels.StartEvent.toLowerCase()}`
			: "Select start event",
	},
	EndEvent: {
		name: "EndEvent",
		input: "time", // Conditional input type based on all-day event
		label: labels.EndEvent,
		placeholder: labels.EndEvent
			? `Select ${labels.EndEvent.toLowerCase()}`
			: "Select end event",
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { modalFields, ModalFields } from "./modalFields";

export const useCalendarForm = () =>
	useForm<ModalFields>({
		resolver: zodResolver(modalFields),
		defaultValues: {
			titleEvent: "",
			textAreaLabel: "",
			tagName: "",
			allDays: false,
			StartDate: "",
			EndDate: "",
			Color: "#6d7b92",
		},
	});

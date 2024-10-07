import { zodResolver } from "@hookform/resolvers/zod";
import { loginFields, LoginFields } from "@repo/zod-types";
import { useForm } from "react-hook-form";

export const useLoginForm = () =>
	useForm<LoginFields>({
		resolver: zodResolver(loginFields),
		defaultValues: {
			email: "",
			password: "",
		},
	});

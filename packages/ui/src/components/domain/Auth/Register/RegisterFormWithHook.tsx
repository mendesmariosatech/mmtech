"use client"

import { RegisterForm } from "../../../form-builder/Forms/Register";
// import { useRouter } from "next/navigation";
import { useRegister } from "../../../../../../hook-services/react-query";

export function RegisterFormWithHook() {
	// const router = useRouter();
	const register = useRegister();

	return (
		<RegisterForm
			isPending={register.isPending}
			error={register.error}
			mutate={register.mutate}
		/>
	);
}

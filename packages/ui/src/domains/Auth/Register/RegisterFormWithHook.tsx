"use client";

import { useRegister } from "@repo/hook-services";
import { RegisterForm } from "../../../components/form-builder/Forms/Register";

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

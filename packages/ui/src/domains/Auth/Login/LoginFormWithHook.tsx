"use client";

import { useLogin } from "@repo/hook-services";
import { LoginForm } from "../../../components/form-builder/Forms/Login/LoginForm";
export function LoginFormWithHook() {
	// const router = useRouter();
	const register = useLogin();

	return (
		<LoginForm
			isPending={register.isPending}
			error={register.error}
			mutate={register.mutate}
		/>
	);
}

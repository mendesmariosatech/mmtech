"use client";

import { useLogin } from "@repo/hook-services";
import { LoginForm } from '../../../form-builder/Forms/Login/LoginForm';

// import { LoginForm } from "../../../form-builder/Forms/Register";
// import { useRouter } from "next/navigation";
// import { useRegister } from "../../../../../../hook-services/react-query";

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

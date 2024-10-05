import { useRegister } from "@repo/hook-services";
import { useRouter } from "next/navigation";
import { RegisterForm } from "../../../components/form-builder/Forms/Register/RegisterForm";

export function RegisterPage() {
	const router = useRouter();
	const register = useRegister();

	return (
		<RegisterForm
			isPending={register.isPending}
			error={register.error}
			mutate={register.mutate}
		/>
	);
}

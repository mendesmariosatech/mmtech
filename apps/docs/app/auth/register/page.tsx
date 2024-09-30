"use client";
import { useRegister } from "@repo/hooks";
import { RegisterForm } from "@repo/ui/components/form-builder/Forms/Register/RegisterForm";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter()
  const register = useRegister()


  return (<RegisterForm {...register} />);
}

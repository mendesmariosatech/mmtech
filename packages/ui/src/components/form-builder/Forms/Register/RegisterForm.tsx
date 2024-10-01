"use client";
import React from "react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ControlledForm } from "../../ControlledForm";
import { Button } from "../../../ui/button";
import { registerFormConfig } from "./Register.config";
import { type RegisterFields, registerFields } from "@repo/zod-types";
// import { useRegister } from "@repo/hooks-server";
import { useRouter } from "next/navigation";
import { useRegister } from "@repo/hook-services";
import { Card, CardContent } from "@repo/ui/components/ui/card";

type RegisterFormProps = {
  mutate: ReturnType<typeof useRegister>["mutate"];
  data: ReturnType<typeof useRegister>["data"];
  isPending: ReturnType<typeof useRegister>["isPending"];
  error: ReturnType<typeof useRegister>["error"];
};

const registerForm = () =>
  useForm<RegisterFields>({
    resolver: zodResolver(registerFields),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      agreeTerms: undefined,
    },
  });

export const RegisterForm = (mutation: RegisterFormProps) => {
  const form = registerForm();

  const handleSubmit = (data: RegisterFields) => {
    console.log(data);
    alert(JSON.stringify(data));
    mutation.mutate(data);
  };

  console.log("Errors", form.formState.errors);

  return (
    <>
      {/* <DevTool control={form.control} /> */}
      <section className="min-h-screen bg-[#25508C] flex items-center">
        <Card className="border-spacing-1 shadow-xl w-full mx-auto max-w-md">
          <div className="flex justify-center m-4">
            <img src="" alt="SUA LOGO AQUI" />
          </div>
          <CardContent className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Sobre você</h2>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Preencha os campos abaixo para criar sua conta.
            </p>
            <ControlledForm
              useForm={form}
              config={registerFormConfig}
              onSubmit={handleSubmit}
            />
            <div className="mt-2 flex justify-center">
              <Button
                onClick={form.handleSubmit(handleSubmit)}
                type="submit"
                disabled={mutation.isPending}
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export function RegisterPage() {
  const router = useRouter();
  const register = useRegister();

  return (
    <RegisterForm
      data={register.data}
      isPending={register.isPending}
      error={register.error}
      mutate={register.mutate}
    />
  );
}

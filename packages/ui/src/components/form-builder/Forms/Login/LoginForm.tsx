"use client";
import { DevTool } from "@hookform/devtools";


import { ControlledForm } from "../../ControlledForm";
import { Button } from "../../../ui/button";
// import { LoginFormConfig } from "./Login.config";
import { type LoginFields } from "@repo/zod-types";
import { useLogin } from "@repo/hook-services";
import { loginFormConfig } from "./LoginConfig";
import { useLoginForm } from "./useLogin.hook";
// import { useLoginForm } from "./useLogin.hooks";

const texts = {
  EN: {
    button: "Submit"
  },
  PT: {
    button: "Entrar"
  }
} as const

type LoginFormProps = {
  mutate: ReturnType<typeof useLogin>["mutate"];
  isPending: ReturnType<typeof useLogin>["isPending"];
  error: ReturnType<typeof useLogin>["error"];
};

export const LoginForm = (mutation: LoginFormProps) => {
  const form = useLoginForm();

  const handleSubmit = (data: LoginFields) => {
    console.log(data);
    mutation.mutate(data);
  };

  console.log("Errors", form.formState.errors);

  return (
    <div className="border-2 border-gray-500 p-4">
      <DevTool control={form.control} />
      <ControlledForm
        useForm={form}
        config={loginFormConfig}
        onSubmit={handleSubmit}
      >
        <div style={{
          padding: "1rem"
        }}>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full"
          >
            {texts.EN.button}
          </Button>
        </div>
      </ControlledForm>
    </div>
  );
};

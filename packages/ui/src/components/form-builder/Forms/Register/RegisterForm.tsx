import React from "react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ControlledForm } from "../../ControlledForm";
import { Button } from "../../../ui/button";
import { RegisterFields, registerFields, registerFormConfig } from "./Register.config";

export const RegisterForm = () => {
  const form = useForm<RegisterFields>({
    resolver: zodResolver(registerFields),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      agreeTerms: undefined,
    }
  });

  const handleSubmit = (data: RegisterFields) => {
    console.log(data);
    alert(JSON.stringify(data));
  };

  console.log("Errors", form.formState.errors);

  return (
    <>
      <DevTool control={form.control} />
      <ControlledForm useForm={form} config={registerFormConfig} onSubmit={handleSubmit} />

      <div style={{ justifyContent: "end", display: "flex", padding: "1rem" }}>

        <Button
          onClick={form.handleSubmit(handleSubmit)}
          type="submit"
        // text="Submit"
        // variant="contained"
        // buttonType="primary"
        >
          Submit
        </Button>
      </div>
    </>
  );
};
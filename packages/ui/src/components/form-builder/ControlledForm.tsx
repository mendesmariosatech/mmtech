import React from "react";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

import { ConfigObject, ControlledInput } from "./ControlledInput";
import { Form } from "../ui/form";

type ControlledForm<T extends FieldValues> = {
  // TODO: improve typing Generic
  config: ConfigObject<FieldValues>;
  useForm: UseFormReturn<T, any>;
  onSubmit: SubmitHandler<T>
};

export const ControlledForm = <T extends FieldValues>({
  useForm,
  config,
  onSubmit,
}: ControlledForm<T>) => {
  return (
    <Form {...useForm}>
      <form onSubmit={useForm.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {Object.entries(config).map(([key, value]) => {
          return (
            <div key={key} >
              {value.input === "text" ? (
                <ControlledInput
                  {...useForm}
                  {...value}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //  @ts-expect-error
                  name={key}
                  input={value.input}
                />
              ) : (
                <ControlledInput
                  {...useForm}
                  {...value}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //  @ts-expect-error
                  name={key}
                  input={value.input}
                />
              )}
            </div>
          );
        })}
      </form>
    </Form>
  );
};
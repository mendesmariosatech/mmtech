import { type RegisterFields, registerFields } from "@repo/zod-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useRegisterForm = () =>
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
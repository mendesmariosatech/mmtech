"use client";
import { RegisterPage } from "@repo/ui/components/domain/index";
import { hono_client } from "~/src/hono-client";

export default function Page() {

  // mandar o email e a senha para o backend
  const handleLogin = async (email: string, password: string) => {
    // mandar o email e a senha para o backend
    hono_client.api.auth.register.$post({
      form: {
        email,
        password,
      }
    })
  };

  return (
    <main>
      <RegisterPage handleLogin={handleLogin} />
    </main>
  );
}

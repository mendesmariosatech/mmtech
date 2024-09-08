"use client";
import { RegisterPage } from "@repo/ui/components/domain/index";
import { useRouter } from "next/navigation";
import { hono_client } from "~/src/hono-client";

export default function Page() {
  const router = useRouter()

  // mandar o email e a senha para o backend
  const handleLogin = async (email: string, password: string) => {
    // mandar o email e a senha para o backend
    try {

      await hono_client.api.auth.register.$post({
        form: {
          email,
          password,
        }
      })

      router.push("/?me=123")

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <main>
      <RegisterPage handleLogin={handleLogin} isLoading={false} />
    </main>
  );
}

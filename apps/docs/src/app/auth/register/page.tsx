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
      console.log("posting action")

      const resp = await hono_client.api.auth.register.$post({
        form: {
          email,
          password,
        }
      })

      if (resp.status !== 201) {
        console.log("error")
        return
      }
      const { data } = await resp.json()

      router.push(`/?id=${data.id}&email=${data.email}`)

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <main>
      <RegisterPage handleLogIn={handleLogin} isLoading={false} />
    </main>
  );
}

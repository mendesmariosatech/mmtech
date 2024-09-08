'use client';

import { Button } from "@repo/ui/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const {push} = useRouter();
  return (
    <main>
      <div>
        <h2>Página de venda</h2>
        <Button onClick={() => {push('/login')}}>Login</Button>
      </div>
    </main>
  );
}

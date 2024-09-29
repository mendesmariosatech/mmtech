'use client'

import { Button } from "@repo/ui/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const {push} = useRouter();
  return (
    <main>
      <p>autenticationPage</p>
      <Button onClick={() => {push('/login/signup')}}>SignUp</Button>
    </main>
  );
}
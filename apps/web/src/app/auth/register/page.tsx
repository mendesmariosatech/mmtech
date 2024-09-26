"use client";
import { RegisterPage } from "@repo/ui/components/domain/index";

export default function Page() {
  return (
    <main>
      <RegisterPage
        isLoading={false}
        handleLogIn={() => { return Promise.resolve() }} />
    </main>
  );
}

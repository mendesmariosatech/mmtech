"use client";

import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <button
      onClick={() => alert(`Hello from your app!`)}
    >
      {children}
    </button>
  );
};

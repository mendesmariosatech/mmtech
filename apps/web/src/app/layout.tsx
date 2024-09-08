import type { Metadata } from "next";
import "@repo/ui/globals.css";

export const metadata: Metadata = {
  title: "Web",
  description: "Web repository",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={''}>{children}</body>
    </html>
  );
}

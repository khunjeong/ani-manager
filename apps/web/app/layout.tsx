import type { Metadata } from "next";
import { AppHeader } from "./components";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ani Manager",
  description:
    "AI anime preference manager that learns viewing history and curates the next season."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}

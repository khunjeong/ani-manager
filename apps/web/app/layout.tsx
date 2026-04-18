import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}

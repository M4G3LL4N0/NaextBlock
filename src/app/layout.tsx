import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NaextBlock",
  description:
    "NaextBlock predicts where real estate markets are going before the market knows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white antialiased">{children}</body>
    </html>
  );
}

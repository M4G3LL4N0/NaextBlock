import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NaextBlock | Predictive Real Estate Intelligence",
  description: "Neighborhood-level market momentum intelligence for discerning investors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#050505] text-white">
      <body className="min-h-screen font-sans antialiased">
        <div className="mx-auto max-w-[1920px]">
          {children}
        </div>
      </body>
    </html>
  );
}

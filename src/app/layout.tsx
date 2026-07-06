import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  title: "Yuga — a journey through time",
  description:
    "A time-travel through India's mythic, historical, and scientific eras — starting with the Mahabharat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteChrome />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}

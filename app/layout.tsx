import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kennisdomein · Infofrankrijk",
  description: "Kennisdomein-cockpit voor expats in Frankrijk.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}

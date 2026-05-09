import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Whenevr® — World-class design, whenever you need it",
  description: "A monthly design subscription for startups, creators, and teams who need work done without the wait.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-(--color-background) text-(--color-foreground) antialiased">{children}</body>
    </html>
  );
}

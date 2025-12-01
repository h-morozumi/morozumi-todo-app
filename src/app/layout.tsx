import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Morozumi TODO App",
  description:
    "A modern, fast TODO application built with Next.js, TypeScript, and Tailwind CSS.",
  openGraph: {
    title: "Morozumi TODO App",
    description:
      "Plan your day with a calm, modern TODO list powered by Next.js and Tailwind.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 antialiased text-white`}
      >
        {children}
      </body>
    </html>
  );
}

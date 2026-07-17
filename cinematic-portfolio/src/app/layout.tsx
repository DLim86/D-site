import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "David Lim — Finance Systems & Applied AI",
  description:
    "David Lim — ten years automating financial systems in Singapore, now completing an applied AI programme. Available for AI engineering, data engineering, and intelligent automation roles.",
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-void text-primary">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        {children}
      </body>
    </html>
  );
}

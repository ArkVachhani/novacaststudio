import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

// Self-hosted via next/font instead of the prototype's Google Fonts <link>
// tags — same two families, faster and more private in production.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-raw",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body-raw",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NovaCastStudio",
  description:
    "AI fashion photoshoot studio — cast a model, set the scene, upload your garment, generate the shot.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <div id="bg-atmosphere" />
        {children}
      </body>
    </html>
  );
}
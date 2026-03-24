import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Анна – Професионални обучения в България",
  description:
    "Премиум обучения по лицев масаж, скулптуриране и козметология. IntraSculpt™, BLEPH EFFECT™, Face Massage Mastery.",
  keywords: [
    "обучения",
    "лицев масаж",
    "скулптуриране",
    "козметология",
    "България",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bg"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

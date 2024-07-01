import type { Metadata } from "next";
import { Noto_Serif, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const noto_serif = Noto_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: "The Office Quotes",
  description: "Find a quotes from the office tv show",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className=" overflow-x-hidden" lang="en">
      <body className={`${inter.className} ${noto_serif.variable}`}>
        {children}
      </body>
    </html>
  );
}
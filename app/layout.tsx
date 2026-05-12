import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karthik Rajan — Engineering Manager",
  description:
    "Engineering Manager at Amazon Neptune (AWS). 14+ years building distributed systems at scale. 30K+ servers, $100M+ ARR, 22 global regions.",
  openGraph: {
    title: "Karthik Rajan",
    description: "SDM @ Amazon Neptune · AWS · Building at scale since 2011",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karthik Rajan — Engineering Manager",
  description:
    "Engineering Manager at Meta Blob Storage. 15+ years in distributed systems at hyperscale.",
  openGraph: {
    title: "Karthik Rajan",
    description: "Engineering Manager @ Meta Blob Storage · Previously Amazon Neptune (14 yrs) · kbrovibes",
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
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

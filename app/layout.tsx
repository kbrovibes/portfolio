import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ServiceWorker from "@/components/ServiceWorker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karthik Rajan — Engineering Manager",
  description:
    "Engineering Manager at Meta Blob Storage. 15+ years in distributed systems at hyperscale.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Karthik Rajan",
  },
  openGraph: {
    title: "Karthik Rajan",
    description: "Engineering Manager, Storage Infra @ Meta · Previously Amazon Neptune (14 yrs) · kbrovibes",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        <ServiceWorker />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

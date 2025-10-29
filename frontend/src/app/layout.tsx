import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudentSathi - Student Engagement Analytics",
  description: "AI-powered student engagement tracking and analytics platform for educators",
  keywords: ["education", "student analytics", "engagement tracking", "LMS"],
  authors: [{ name: "StudentSathi Team" }],
  openGraph: {
    title: "StudentSathi - Student Engagement Analytics",
    description: "AI-powered student engagement tracking and analytics platform for educators",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudentSathi - Student Engagement Analytics",
    description: "AI-powered student engagement tracking and analytics platform for educators",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

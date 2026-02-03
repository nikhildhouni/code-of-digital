import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { getPageSeo } from "@/lib/seo";

export async function generateMetadata() {
  return await getPageSeo('home');
}

import { SiteLoader } from '@/components/public/SiteLoader'
import { SmoothScroll } from '@/components/smooth-scroll'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteLoader />
          <SmoothScroll>
            {children}
            <Toaster />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

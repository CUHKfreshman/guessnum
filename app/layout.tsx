'use client';
import { Orbitron as FontSans } from "next/font/google";  
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "@/providers/appContextProvider";
import AnimateWavesProvider from "@/providers/AnimateWavesProvider";
import "./globals.css";

import { cn } from "@/lib/utils";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="A decentralized application for guessing numbers and winning tokens." />
      <title key="title">GUESSNUM</title>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
      <AppProvider>
        <AnimateWavesProvider>
        <Toaster />
        {children}
        </AnimateWavesProvider>
    </AppProvider>
      </body>
    </html>
  )
}
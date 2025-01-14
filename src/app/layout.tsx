import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from '@/components/ui/ToastProvider';

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Counter Click",
  description: "A cool animated counter with cooldown",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-mono`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

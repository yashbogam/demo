import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { initializeAmplitude } from "@/lib/amplitude";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DataMaster",
  description: "Your complete solution for data management and visualization",
};

// Client Component wrapper for Amplitude initialization
function AmplitudeInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeAmplitude();
  }, []);

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <AmplitudeInitializer>
          <Header />
          <main>
            {children}
          </main>
        </AmplitudeInitializer>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/lib/theme-provider";
import { FirebaseAuthProvider } from "@/components/providers";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rewind | Relive Internet Culture by Year",
  description: "Explore internet culture by year and month - a nostalgic, Spotify-Wrapped-style platform for digital history.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.variable,
          spaceMono.variable,
          "antialiased min-h-screen"
        )}
      >
        <ThemeProvider>
          <FirebaseAuthProvider>
            <Header />
            <main className="pt-16">
              {children}
            </main>
          </FirebaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

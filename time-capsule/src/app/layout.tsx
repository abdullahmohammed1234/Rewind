import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import "./globals.css";

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
  title: "TimeCapsule | Relive Internet Culture by Year",
  description: "Explore internet culture by year and month - a nostalgic, Spotify-Wrapped-style platform for digital history.",
};

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-retro-cream/80 backdrop-blur-md border-b border-retro-teal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
              📼
            </span>
            <span className="font-bold text-xl text-retro-dark">
              TimeCapsule
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-sm font-medium text-retro-gray hover:text-retro-teal transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/years" 
              className="text-sm font-medium text-retro-gray hover:text-retro-teal transition-colors"
            >
              General Capsules
            </Link>
            <Link 
              href="/all-time" 
              className="text-sm font-medium text-retro-gray hover:text-retro-teal transition-colors"
            >
              All-Time
            </Link>
            <Link 
              href="/my-capsule"
              className="text-sm font-medium text-retro-gray hover:text-retro-teal transition-colors"
            >
              MyCapsule
            </Link>
            <Link 
              href="/compare" 
              className="text-sm font-medium text-retro-gray hover:text-retro-teal transition-colors"
            >
              Compare
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-retro-gray">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

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
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}

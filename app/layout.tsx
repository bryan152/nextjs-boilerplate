import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bryan Viveros | Portfolio",
  description:
    "Resume and portfolio website for Bryan Viveros, focused on software development, cybersecurity, cloud tools, and self-hosted systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="bg-[#1e3a5f] text-white sticky top-0 z-50 shadow-sm">
          <nav
            aria-label="Main navigation"
            className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center"
          >
            <Link href="/" className="font-bold text-xl tracking-tight">
              Bryan Viveros
            </Link>

            <div className="flex flex-wrap justify-center gap-3 items-center">
              <Link href="/" className="nav-link">
                Home
              </Link>

              <Link href="/things-to-read" className="nav-link">
                Things to Read
              </Link>

              <div className="nav-dropdown">
                <button className="nav-link nav-dropdown-button" type="button">
                  Things I Enjoy <span aria-hidden="true">▾</span>
                </button>

                <div className="nav-dropdown-menu" aria-label="Things I Enjoy submenu">
                  <Link href="/osrs" className="nav-dropdown-item">
                    Old School RuneScape
                  </Link>
                </div>
              </div>

              <Link href="/demo-day" className="nav-link">
                Demo Day!
              </Link>
            </div>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}

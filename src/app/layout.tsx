import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Epic Freebies',
  description: 'Find the latest free games on the Epic Games Store',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Force dark theme for demo */}
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          'min-h-screen bg-background font-sans'
        )}
      >
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 hidden md:flex">
              <a className="mr-6 flex items-center space-x-2" href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  className="h-6 w-6 fill-primary" // Use primary (teal) color
                >
                  <path d="M208 16a88 88 0 0 0-76.61 46.67A88 88 0 1 0 240 104a87.45 87.45 0 0 0-3.36-24H192a48 48 0 1 1-24.11-89.47A88.13 88.13 0 0 0 208 16Z"></path>
                </svg>

                <span className="hidden font-bold sm:inline-block text-foreground">
                  Epic Freebies
                </span>
              </a>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="py-6 md:px-8 md:py-0 bg-background border-t">
          <div className="container flex h-24 items-center justify-center">
            <p className="text-balance text-center text-sm font-bold leading-loose text-primary">
              Built by @celikd
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Revivio - Turn E-Waste into Rewards",
  description: "Join Revivio in the fight against electronic waste. Recycle your old devices, earn E-Points, and redeem them for exciting rewards while protecting our planet.",
  keywords: ["Revivio", "e-waste", "recycling", "rewards", "environment", "sustainability"],
  authors: [{ name: "Revivio Team" }],
  openGraph: {
    title: "Revivio - Turn E-Waste into Rewards",
    description: "Recycle your old devices, earn E-Points, and redeem them for exciting rewards while protecting our planet.",
    url: "https://revivio.com",
    siteName: "Revivio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revivio - Turn E-Waste into Rewards",
    description: "Recycle your old devices, earn E-Points, and redeem them for exciting rewards while protecting our planet.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

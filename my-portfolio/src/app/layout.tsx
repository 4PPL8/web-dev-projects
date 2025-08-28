import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Qasim Arshad — Futuristic Portfolio",
  description: "Immersive, high-performance portfolio with animations and 3D.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Qasim Arshad — Futuristic Portfolio",
    description: "Immersive, high-performance portfolio with animations and 3D.",
    type: "website",
    url: "https://example.com",
  },
  icons: {
    icon: "/my-favicon.png",
    shortcut: "/my-favicon.png",
    apple: "/my-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}

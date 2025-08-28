import type { Metadata } from "next";
import { Jersey_15, VT323 } from "next/font/google";
import "./globals.css";

const jersey = Jersey_15({
  weight: "400",
  variable: "--font-jersey",
  subsets: ["latin"],
});

const pixel = VT323({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qasim Arshad ",
  description: "Immersive, high-performance portfolio with animations and 3D.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Qasim Arshad ",
    description: "Immersive, high-performance portfolio with animations and 3D.",
    type: "website",
    url: "https://example.com",
  },
  icons: {
    icon: [
      { url: "/my-favicon.png", type: "image/png" },
    ],
    shortcut: [
      { url: "/my-favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/my-favicon.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jersey.variable} ${pixel.variable} antialiased`}>{children}</body>
    </html>
  );
}

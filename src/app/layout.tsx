import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  metadataBase: new URL("https://koshaljoshi.com"), // Placeholder canonical URL
  title: "Koshal Joshi | Digital Engineer",
  description: "I build fast, modern, and high-converting digital experiences.",
  openGraph: {
    title: "Koshal Joshi | Digital Engineer",
    description: "I build fast, modern, and high-converting digital experiences.",
    url: "https://koshaljoshi.com",
    siteName: "Koshal Joshi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koshal Joshi | Digital Engineer",
    description: "I build fast, modern, and high-converting digital experiences.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-black text-white selection:bg-white selection:text-black`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Space_Grotesk, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const bodoniModa = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", style: ["normal", "italic"] });

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
        className={`${inter.variable} ${spaceGrotesk.variable} ${bodoniModa.variable} font-sans antialiased bg-[#FAFAFA] text-[#09090B] selection:bg-[#09090B] selection:text-white cursor-none`}
      >
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

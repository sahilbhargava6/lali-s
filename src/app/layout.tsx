import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lali's BuildMart | Construction Materials & Wholesale",
  description: "Lali's BuildMart is a trusted building materials supplier in Dharamshala, providing quality products to contractors, builders, developers, institutions, and homeowners since 1924.",
  keywords: ["Construction Materials", "Bulk Supply", "Wholesale Hardware", "Paints Dharamshala", "Modular Kitchens", "Building Partner"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${plusJakarta.variable} font-sans bg-slate-50 text-slate-900 antialiased selection:bg-[#D22027] selection:text-white`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

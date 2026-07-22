import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Lali's BuildMart | Heritage Hardware, Tools, Modular Kitchens & Wholesale",
  description: "Lali's BuildMart is a 100+ year old Hardware, Paint, Pipes & Sanitary, Plywood, Modular Kitchens & Electrical Retailer & Wholesaler. Specializing in bulk construction projects.",
  keywords: ["Hardware Shop", "Wholesale Hardware", "Bosch Tools", "Asian Paints", "Modular Kitchens", "Hettich", "Fevicol", "Plywood", "Sanitaryware"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${plusJakarta.variable} font-sans bg-[#EDE6D6] text-[#2B2B28] antialiased selection:bg-[#8C3B2E] selection:text-[#EDE6D6]`}>
        {children}
      </body>
    </html>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Our Products" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu on Escape or when the viewport grows to desktop width
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsMenuOpen(false);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setIsMenuOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [isMenuOpen]);

  return (
    <header className={`fixed top-3 md:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] md:w-[95%] max-w-7xl z-50 transition-all duration-300 rounded-2xl lg:rounded-full border border-white/40 shadow-xl shadow-black/5 ${scrolled || isMenuOpen ? 'bg-white/70 backdrop-blur-xl py-2' : 'bg-white/30 backdrop-blur-md py-3'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <img src="/Logo-wb.png" alt="Lalisons Buildmart" className="h-9 sm:h-10 md:h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold text-gray-700">
           {navLinks.map((link) => (
             <Link key={link.href} href={link.href} className="hover:text-[#D22027] transition-colors whitespace-nowrap">{link.label}</Link>
           ))}
        </nav>

        <div className="hidden lg:block shrink-0">
          <Link href="/contact" className="bg-[#D22027] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#b01920] transition-colors shadow-lg shadow-red-500/20 whitespace-nowrap">
            Request Quote
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 -mr-1 text-slate-900"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="absolute top-full mt-2 left-0 w-full max-h-[calc(100svh-6rem)] overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/50 p-4 sm:p-6 font-bold shadow-xl rounded-2xl lg:hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-base sm:text-lg rounded-xl hover:text-[#D22027] hover:bg-slate-50 transition-colors">{link.label}</Link>
            ))}
          </nav>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="mt-3 block text-center bg-[#D22027] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#b01920] transition-colors shadow-lg shadow-red-500/20">
            Request Quote
          </Link>
        </div>
      )}
    </header>
  );
}

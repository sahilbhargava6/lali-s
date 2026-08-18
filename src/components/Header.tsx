"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300 rounded-2xl md:rounded-full border border-white/40 shadow-xl shadow-black/5 ${scrolled ? 'bg-white/70 backdrop-blur-xl py-2' : 'bg-white/30 backdrop-blur-md py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <img src="/Logo-wb.png" alt="Lalisons Buildmart" className="h-10 md:h-12 w-auto object-contain" />
        </Link>
        
        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-700">
           <Link href="/about" className="hover:text-[#D22027] transition-colors">About Us</Link>
           <Link href="/products" className="hover:text-[#D22027] transition-colors">Our Products</Link>
           <Link href="/projects" className="hover:text-[#D22027] transition-colors">Projects</Link>
           <Link href="/contact" className="hover:text-[#D22027] transition-colors">Contact</Link>
        </nav>
        
        <div className="hidden lg:block">
          <Link href="/contact" className="bg-[#D22027] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#b01920] transition-colors shadow-lg shadow-red-500/20">
            Request Quote
          </Link>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-slate-900">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full mt-2 left-0 w-full bg-white/90 backdrop-blur-xl border border-white/50 p-6 space-y-4 font-bold shadow-xl rounded-2xl lg:hidden">
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block text-lg hover:text-[#D22027]">About Us</Link>
          <Link href="/products" onClick={() => setIsMenuOpen(false)} className="block text-lg hover:text-[#D22027]">Our Products</Link>
          <Link href="/projects" onClick={() => setIsMenuOpen(false)} className="block text-lg hover:text-[#D22027]">Projects</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block text-lg hover:text-[#D22027]">Contact</Link>
        </div>
      )}
    </header>
  );
}

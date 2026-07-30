const fs = require('fs');
const path = require('path');

const pageContent = `
"use client";

import { useState } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Paintbrush,
  Droplets,
  Zap,
  Wrench,
  Utensils,
  Layers,
  LayoutGrid,
  ShieldAlert,
  StickyNote
} from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    {
      id: "paints",
      name: "Paints & Surface Coatings",
      icon: Paintbrush,
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "plumbing",
      name: "Plumbing & Sanitary Products",
      icon: Droplets,
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "electrical",
      name: "Electrical Supplies",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "tools",
      name: "Tools & Accessories",
      icon: Wrench,
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "kitchens",
      name: "Kitchens, Hardware & Digital locks",
      icon: Utensils,
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "plywood",
      name: "Plywood & laminates",
      icon: Layers,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "flooring",
      name: "Flooring",
      icon: LayoutGrid,
      image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "waterproofing",
      name: "Waterproofing Chemicals",
      icon: ShieldAlert,
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "adhesives",
      name: "Tile Adhesives",
      icon: StickyNote,
      image: "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?auto=format&fit=crop&w=600&q=80",
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans overflow-x-hidden">
      {/* 1. HEADER SECTION (White & Clean) */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        {/* Top Contact Bar */}
        <div className="bg-[#111111] text-xs py-2 px-4 text-white">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-6">
              <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-[#FDE047] transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span>+91-98765-43210</span>
              </a>
              <a href="mailto:sales@lalisonsbuildmart.com" className="flex items-center gap-1.5 hover:text-[#FDE047] transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span>sales@lalisonsbuildmart.com</span>
              </a>
            </div>
            <div className="flex items-center gap-5">
              <a href="#store-locator" className="flex items-center gap-1 hover:text-[#FDE047] transition-colors">
                <MapPin className="w-3.5 h-3.5" />
                <span>Store Locator</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <a href="#" className="flex flex-col group shrink-0">
            <span className="text-2xl font-bold tracking-tight text-[#111111]">
              LALISONS <span className="text-[#D22027]">BUILDMART</span>
            </span>
          </a>

          {/* Navigation Actions */}
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#111111]">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-[#111111]">
               <a href="#" className="hover:text-[#D22027] transition-colors">Home</a>
               <a href="#products" className="hover:text-[#D22027] transition-colors">Products</a>
               <a href="#about" className="hover:text-[#D22027] transition-colors">About Us</a>
               <a href="#contact" className="hover:text-[#D22027] transition-colors">Contact</a>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-3 font-bold">
            <a href="#" className="block py-2 text-[#111111] hover:text-[#D22027]">Home</a>
            <a href="#products" className="block py-2 text-[#111111] hover:text-[#D22027]">Products</a>
            <a href="#about" className="block py-2 text-[#111111] hover:text-[#D22027]">About Us</a>
            <a href="#contact" className="block py-2 text-[#111111] hover:text-[#D22027]">Contact</a>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="bg-white py-16 px-4">
         <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl space-y-6">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#111111] leading-tight">
                    Premium Quality <br />
                    <span className="text-[#D22027]">Building Materials</span>
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                    Your one-stop destination for authentic hardware, paints, electrical supplies, and more. 
                </p>
                <div className="pt-4">
                    <a href="#products" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-[#111111] bg-[#FDE047] hover:bg-[#facc15] transition-colors shadow-md">
                        Explore Our Range
                    </a>
                </div>
            </div>
            <div className="relative w-full max-w-md hidden md:block">
                {/* Decorative Elements mimicking the poster */}
                <div className="absolute -left-8 -top-8 w-16 h-48 bg-[#D22027]"></div>
                <div className="absolute -left-8 top-40 w-16 h-16 bg-[#111111]"></div>
                <div className="relative bg-gray-100 p-8 shadow-xl z-10 border border-gray-200">
                    <img 
                      src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80" 
                      alt="Construction Materials" 
                      className="w-full h-64 object-cover filter contrast-125"
                    />
                </div>
            </div>
         </div>
      </section>

      {/* 3. PRODUCT RANGE SECTION (Matching the poster) */}
      <section id="products" className="py-20 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          {/* Section Header exactly like poster */}
          <div className="flex items-start gap-6 mb-16">
             <div className="flex flex-col">
                <div className="w-8 h-24 bg-[#D22027]"></div>
                <div className="w-8 h-8 bg-[#111111]"></div>
             </div>
             <div className="pt-2">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#D22027] tracking-tight">Our Product</h2>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-400 tracking-tight mt-1">Range</h2>
             </div>
          </div>

          {/* Product List (Yellow Blocks) */}
          <div className="space-y-6">
            {categories.map((cat, index) => (
              <div 
                key={index} 
                className="group relative flex flex-col sm:flex-row items-center bg-[#FDE047] hover:bg-[#facc15] transition-colors shadow-sm overflow-hidden cursor-pointer h-auto sm:h-32"
              >
                 {/* Left side Image */}
                 <div className="w-full sm:w-1/3 h-48 sm:h-full bg-white relative">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" 
                    />
                    {/* Faded white gradient to blend the image into the yellow background nicely */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white sm:to-[#FDE047] opacity-0 sm:opacity-100 group-hover:to-[#facc15] transition-colors duration-200 pointer-events-none"></div>
                 </div>
                 
                 {/* Right side Text */}
                 <div className="w-full sm:w-2/3 p-6 sm:p-8 flex items-center justify-between z-10">
                    <h3 className="text-lg sm:text-xl font-bold text-[#111111] pr-4">{cat.name}</h3>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-[#111111] group-hover:text-[#D22027] transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER (Matching the bottom of the poster) */}
      <footer className="bg-white pt-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row bg-[#111111] text-white overflow-hidden shadow-2xl">
           <div className="bg-[#D22027] px-8 py-6 flex items-center justify-center md:w-1/3 skew-x-[-10deg] -ml-4 pl-8 z-10">
              <span className="font-bold text-sm tracking-widest skew-x-[10deg]">LALISONS BUILDMART PVT. LTD.</span>
           </div>
           <div className="px-8 py-6 flex items-center justify-center md:w-2/3 bg-[#111111] text-sm text-gray-400">
              © 2026 Lalisons Buildmart. All rights reserved.
           </div>
        </div>
        <div className="h-8"></div>
      </footer>
    </div>
  );
}
\`;

fs.writeFileSync(path.join(__dirname, 'src', 'app', 'page.tsx'), pageContent, 'utf8');
console.log('Successfully updated page.tsx with the new flat design and product categories.');

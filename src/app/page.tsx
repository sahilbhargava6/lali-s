"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  User,
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Award,
  Building2,
  CheckCircle2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Wrench,
  Paintbrush,
  Droplets,
  Layers,
  Zap,
  Hammer,
  Utensils,
  Maximize2,
  Glasses,
  Send,
  Star,
  Clock,
  PhoneCall,
  ChevronRight,
  TrendingUp,
  Box,
  Truck,
  Check,
} from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sampleSuggestions = [
    "Bosch Cordless Drill Machine",
    "Fevicol SH Synthetic Resin Adhesive 50kg",
    "Asian Paints Royale Luxury Emulsion",
    "Hettich Soft-Close Drawer Hinges",
    "Greenlam Laminates Matte Finish 1mm",
    "Wavin CPVC Pipes & Fittings",
    "Dulux Velvet Touch Paint",
    "Stanley Hand Tool Kit",
    "Dewalt Angular Grinder",
    "Greatwhite Switches & Socket Combo",
    "Sleek Modular Kitchen Cabinets",
    "Norton Saint Gobain Cutting Wheels",
  ];

  const filteredSuggestions = searchQuery.trim()
    ? sampleSuggestions.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const categories = [
    {
      id: "hardware",
      name: "Hardware & Fasteners",
      items: "Nut bolts, screws, hinges, Dorset, Hettich",
      icon: Wrench,
      badge: "Top Seller",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "paints",
      name: "Paints & Finishes",
      items: "Dulux, Asian Paints, Indigo, DUCO",
      icon: Paintbrush,
      badge: "100% Genuine",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "pipes",
      name: "Pipes & Sanitary",
      items: "Wavin, plumbing essentials, luxury fittings",
      icon: Droplets,
      badge: "Heavy Duty",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "plywood",
      name: "Plywood & Laminates",
      items: "Black Cobra, Samrat, Greenlam, Greenpanel",
      icon: Layers,
      badge: "Waterproof",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "tools",
      name: "Tools & Power Tools",
      items: "Bosch, Stanley, Dewalt, Blades/Cutters",
      icon: Hammer,
      badge: "Pro Grade",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "electricals",
      name: "Electricals",
      items: "Greatwhite Electrical, cables, LED fixtures",
      icon: Zap,
      badge: "Certified",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "adhesives",
      name: "Adhesives & Waterproofing",
      items: "Fevicol, Bostik, Bond Tek",
      icon: Sparkles,
      badge: "Industrial",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "kitchens",
      name: "Modular Kitchens & Wardrobes",
      items: "Sleek, customized hardware layouts",
      icon: Utensils,
      badge: "Premium Design",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "decor",
      name: "Decor & Paneling",
      items: "VOX, Louvers, acoustic panels",
      icon: Maximize2,
      badge: "Modern Styles",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "abrasives",
      name: "Abrasives & Glass",
      items: "Norton Saint Gobain, cutting discs",
      icon: Glasses,
      badge: "High Precision",
      image: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const brands = [
    { name: "Dulux", logo: "🎨 Dulux" },
    { name: "Asian Paints", logo: "🖌️ Asian Paints" },
    { name: "DUCO", logo: "✨ DUCO" },
    { name: "Fevicol", logo: "💧 Fevicol" },
    { name: "Sleek", logo: "🍳 Sleek" },
    { name: "Dorset", logo: "🔑 Dorset" },
    { name: "Bosch", logo: "⚡ Bosch" },
    { name: "Stanley", logo: "🛠️ Stanley" },
    { name: "Dewalt", logo: "⚙️ Dewalt" },
    { name: "Indigo Paints", logo: "🎨 Indigo" },
    { name: "Wavin", logo: "🚰 Wavin" },
    { name: "Black Cobra Ply", logo: "🪵 Black Cobra" },
    { name: "Samrat Ply", logo: "🪵 Samrat" },
    { name: "Norton Saint Gobain", logo: "💎 Norton" },
    { name: "Bond Tek", logo: "🧪 Bond Tek" },
    { name: "Bostik", logo: "🧱 Bostik" },
    { name: "Hettich", logo: "🔩 Hettich" },
    { name: "Greenlam Laminates", logo: "✨ Greenlam" },
    { name: "Greatwhite Electrical", logo: "⚡ Greatwhite" },
    { name: "Suzu", logo: "🔒 Suzu" },
    { name: "Louvers", logo: "🏛️ Louvers" },
    { name: "Greenpanel", logo: "🪵 Greenpanel" },
    { name: "VOX", logo: "🏠 VOX" },
  ];

  return (
    <div className="min-h-screen bg-[#EDE6D6] text-[#2B2B28] flex flex-col font-sans">
      {/* 1. HEADER SECTION (Sticky Navigation Bar with Neumorphism) */}
      <header className="sticky top-0 z-50 bg-[#2B2B28] text-[#EDE6D6] shadow-2xl border-b border-[#B9924C]/30">
        {/* Top Bar (Thin) */}
        <div className="bg-[#242421] text-xs py-2 px-4 border-b border-[#4A4F52]/40 text-[#EDE6D6]/80">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-6">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-1.5 hover:text-[#B9924C] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#B9924C]" />
                <span>+91-98765-43210</span>
              </a>
              <a
                href="mailto:sales@lalisbuildmart.com"
                className="flex items-center gap-1.5 hover:text-[#B9924C] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#B9924C]" />
                <span>sales@lalisbuildmart.com</span>
              </a>
            </div>
            <div className="flex items-center gap-5">
              <a
                href="#store-locator"
                className="flex items-center gap-1 hover:text-[#B9924C] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#B9924C]" />
                <span>Store Locator</span>
              </a>
              <span className="text-[#4A4F52]">|</span>
              <a
                href="#login"
                className="flex items-center gap-1 text-[#B9924C] hover:text-[#EDE6D6] font-semibold transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login / Register for Wholesale</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex flex-col group shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl neo-dark flex items-center justify-center text-[#B9924C] font-serif font-black text-2xl border border-[#B9924C]/30 group-hover:scale-105 transition-transform">
                L
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#EDE6D6] group-hover:text-[#B9924C] transition-colors">
                  Lali's <span className="text-[#B9924C]">BuildMart</span>
                </span>
                <p className="text-[10px] text-[#EDE6D6]/70 font-semibold tracking-widest uppercase">
                  Est. 1924 • Over 100 Years of Trust
                </p>
              </div>
            </div>
          </a>

          {/* Search Bar with Neumorphic Inset */}
          <div className="relative flex-1 max-w-xl hidden md:block">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for Bosch drills, Fevicol, Plywood, Hettich fittings..."
                className="w-full neo-dark-inset text-sm text-[#EDE6D6] placeholder-[#EDE6D6]/50 pl-10 pr-4 py-2.5 rounded-full border border-[#4A4F52]/60 focus:outline-none focus:border-[#B9924C] transition-all"
              />
              <Search className="w-4 h-4 text-[#B9924C] absolute left-3.5" />
            </div>

            {/* Predictive Text Dropdown */}
            {filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#2B2B28] border border-[#B9924C]/40 rounded-xl neo-dark z-50 overflow-hidden">
                <div className="p-2 text-xs font-semibold text-[#B9924C] bg-[#242421] border-b border-[#4A4F52]/50">
                  Popular Product Matches
                </div>
                <ul>
                  {filteredSuggestions.map((item, idx) => (
                    <li
                      key={idx}
                      onClick={() => setSearchQuery(item)}
                      className="px-4 py-2.5 hover:bg-[#8C3B2E]/20 hover:text-[#B9924C] text-sm cursor-pointer border-b border-[#4A4F52]/30 last:border-none flex items-center justify-between text-[#EDE6D6]"
                    >
                      <span>{item}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#B9924C]" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#EDE6D6] hover:text-[#B9924C]"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Cart Icon (Neumorphic Button) */}
            <a
              href="#cart"
              className="relative p-2.5 text-[#EDE6D6] hover:text-[#B9924C] neo-dark-sm rounded-full transition-all flex items-center gap-2 px-4 border border-[#B9924C]/20 hover:scale-105"
            >
              <ShoppingCart className="w-4 h-4 text-[#B9924C]" />
              <span className="hidden sm:inline text-xs font-bold text-[#EDE6D6]">
                Cart
              </span>
              <span className="bg-[#8C3B2E] text-[#EDE6D6] text-[10px] font-extrabold px-2 py-0.5 rounded-full neo-dark-sm">
                3
              </span>
            </a>
          </div>
        </div>

        {/* Menu Links */}
        <nav className="bg-[#262623] border-t border-[#4A4F52]/40 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 font-medium text-[#EDE6D6]">
              <a
                href="#"
                className="px-4 py-2.5 hover:text-[#B9924C] hover:bg-[#2B2B28] transition-colors rounded-md font-semibold text-[#B9924C]"
              >
                Home
              </a>
              <div className="relative group">
                <button className="px-4 py-2.5 hover:text-[#B9924C] hover:bg-[#2B2B28] transition-colors rounded-md flex items-center gap-1">
                  <span>All Categories</span>
                  <ChevronDown className="w-4 h-4 text-[#B9924C] group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-[#2B2B28] border border-[#B9924C]/40 rounded-lg neo-dark hidden group-hover:block p-2 z-50">
                  {categories.map((cat) => (
                    <a
                      key={cat.id}
                      href={`#${cat.id}`}
                      className="block px-3 py-2 text-xs text-[#EDE6D6] hover:bg-[#8C3B2E]/20 hover:text-[#B9924C] rounded-md transition-colors"
                    >
                      {cat.name}
                    </a>
                  ))}
                </div>
              </div>
              <a
                href="#bulk-projects"
                className="px-4 py-2.5 hover:text-[#B9924C] hover:bg-[#2B2B28] transition-colors rounded-md flex items-center gap-1.5 text-[#B9924C] font-semibold"
              >
                <Building2 className="w-4 h-4" />
                <span>Bulk / Projects</span>
              </a>
              <a
                href="#modular-kitchens"
                className="px-4 py-2.5 hover:text-[#B9924C] hover:bg-[#2B2B28] transition-colors rounded-md"
              >
                Modular Kitchens
              </a>
              <a
                href="#our-brands"
                className="px-4 py-2.5 hover:text-[#B9924C] hover:bg-[#2B2B28] transition-colors rounded-md"
              >
                Our Brands
              </a>
              <a
                href="#contact"
                className="px-4 py-2.5 hover:text-[#B9924C] hover:bg-[#2B2B28] transition-colors rounded-md"
              >
                Contact Us
              </a>
            </div>
            <div className="text-xs text-[#B9924C] font-medium tracking-wide">
              ✦ Wholesale Direct Pricing for Heavy Orders
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#2B2B28] border-t border-[#4A4F52] p-4 space-y-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full neo-dark-inset text-sm text-[#EDE6D6] pl-9 pr-4 py-2 rounded-lg border border-[#4A4F52]"
              />
              <Search className="w-4 h-4 text-[#B9924C] absolute left-3 top-3" />
            </div>
            <a href="#" className="block py-2 text-[#EDE6D6] hover:text-[#B9924C]">
              Home
            </a>
            <a href="#categories" className="block py-2 text-[#EDE6D6] hover:text-[#B9924C]">
              All Categories
            </a>
            <a href="#bulk-projects" className="block py-2 text-[#B9924C] font-semibold">
              Bulk / Projects
            </a>
            <a href="#modular-kitchens" className="block py-2 text-[#EDE6D6] hover:text-[#B9924C]">
              Modular Kitchens & Wardrobes
            </a>
            <a href="#our-brands" className="block py-2 text-[#EDE6D6] hover:text-[#B9924C]">
              Our Brands
            </a>
            <a href="#contact" className="block py-2 text-[#EDE6D6] hover:text-[#B9924C]">
              Contact Us
            </a>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-[#2B2B28] text-[#EDE6D6] py-16 px-4 border-b border-[#B9924C]/30">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B2B28] via-[#2B2B28]/95 to-[#2B2B28]/80"></div>

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 neo-dark-sm px-4 py-2 rounded-full text-[#B9924C] text-xs font-semibold tracking-wider uppercase border border-[#B9924C]/30">
              <Sparkles className="w-4 h-4 text-[#8C3B2E]" />
              <span>Over 100 Years of Heritage & Craftsmanship</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#EDE6D6] leading-tight tracking-tight">
              Build Your Dream Home with a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B9924C] via-[#EDE6D6] to-[#B9924C]">
                Century of Trust.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#EDE6D6]/80 max-w-2xl font-sans leading-relaxed">
              From foundational nut bolts to luxury modular kitchens—everything you need under one roof at unbeatable prices. Preferred supplier for contractors, architects & homeowners.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#categories"
                className="bg-[#8C3B2E] hover:bg-[#8C3B2E]/90 text-[#EDE6D6] font-bold px-8 py-4 rounded-2xl neo-dark shadow-xl border border-[#B9924C]/40 hover:-translate-y-1 transition-all flex items-center gap-2 text-base"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-5 h-5 text-[#B9924C]" />
              </a>
              <a
                href="#bulk-projects"
                className="neo-dark hover:bg-[#32322e] text-[#B9924C] font-semibold px-8 py-4 rounded-2xl border border-[#B9924C]/50 hover:-translate-y-1 transition-all flex items-center gap-2 text-base"
              >
                <span>Request Bulk Quote</span>
                <Building2 className="w-4 h-4 text-[#B9924C]" />
              </a>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#4A4F52]/40 text-[#EDE6D6]">
              <div className="neo-dark-inset p-3.5 rounded-xl border border-[#4A4F52]/30 text-center">
                <div className="text-2xl font-serif font-black text-[#B9924C]">100k+</div>
                <div className="text-xs text-[#EDE6D6]/70">Products Stocked</div>
              </div>
              <div className="neo-dark-inset p-3.5 rounded-xl border border-[#4A4F52]/30 text-center">
                <div className="text-2xl font-serif font-black text-[#B9924C]">50+</div>
                <div className="text-xs text-[#EDE6D6]/70">Top Brands Partnered</div>
              </div>
              <div className="neo-dark-inset p-3.5 rounded-xl border border-[#4A4F52]/30 text-center">
                <div className="text-2xl font-serif font-black text-[#B9924C]">25,000+</div>
                <div className="text-xs text-[#EDE6D6]/70">Projects Supplied</div>
              </div>
            </div>
          </div>

          {/* Hero Frame Card */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden border border-[#B9924C]/40 neo-dark p-3 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Modern Hardware & Dream Home Concept"
                className="rounded-2xl object-cover w-full h-[400px] filter contrast-105"
              />
              <div className="absolute bottom-6 left-6 right-6 neo-dark border border-[#B9924C]/40 p-4 rounded-xl backdrop-blur-md flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-[#B9924C] uppercase tracking-widest">
                    Featured Collection
                  </p>
                  <p className="text-sm font-serif font-bold text-[#EDE6D6]">
                    German Fittings & Power Tools
                  </p>
                </div>
                <div className="bg-[#8C3B2E] text-[#EDE6D6] p-2.5 rounded-xl border border-[#B9924C]/40 neo-dark-sm">
                  <Star className="w-5 h-5 fill-current text-[#B9924C]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST BANNER (The Legacy - Neumorphic Tiles) */}
      <section className="bg-[#2B2B28] text-[#EDE6D6] border-y border-[#B9924C]/30 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="neo-dark-sm p-4 rounded-2xl border border-[#B9924C]/20 flex items-center justify-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#8C3B2E]/20 text-[#B9924C] border border-[#8C3B2E]/40">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-serif font-bold text-[#EDE6D6]">100+ Years</div>
              <div className="text-xs text-[#EDE6D6]/70">Of Excellence</div>
            </div>
          </div>

          <div className="neo-dark-sm p-4 rounded-2xl border border-[#B9924C]/20 flex items-center justify-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#8C3B2E]/20 text-[#B9924C] border border-[#8C3B2E]/40">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-serif font-bold text-[#EDE6D6]">Bulk Project</div>
              <div className="text-xs text-[#EDE6D6]/70">Specialists</div>
            </div>
          </div>

          <div className="neo-dark-sm p-4 rounded-2xl border border-[#B9924C]/20 flex items-center justify-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#8C3B2E]/20 text-[#B9924C] border border-[#8C3B2E]/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-serif font-bold text-[#EDE6D6]">Top Brands</div>
              <div className="text-xs text-[#EDE6D6]/70">Guaranteed Original</div>
            </div>
          </div>

          <div className="neo-dark-sm p-4 rounded-2xl border border-[#B9924C]/20 flex items-center justify-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#8C3B2E]/20 text-[#B9924C] border border-[#8C3B2E]/40">
              <Tag className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-serif font-bold text-[#EDE6D6]">Unbeatable</div>
              <div className="text-xs text-[#EDE6D6]/70">Wholesale Prices</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT CATEGORIES (BENTO GRID LAYOUT) */}
      <section id="categories" className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#8C3B2E]">
            Curated Catalog
          </h2>
          <p className="text-3xl sm:text-5xl font-serif font-bold text-[#2B2B28]">
            Explore Our Comprehensive Range
          </p>
          <p className="text-sm text-[#4A4F52]">
            Discover over 100,000+ authentic hardware items, structural fittings, paints & power tools in our Bento Grid catalog.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[240px]">
          
          {/* Bento Item 1: Hardware & Fasteners (Featured Large 2x2) */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-3xl neo-paper overflow-hidden group border border-[#B9924C]/30 flex flex-col justify-end p-6 hover:shadow-2xl transition-all">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
              alt="Hardware & Fasteners"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B28] via-[#2B2B28]/50 to-transparent"></div>
            <div className="relative z-10 space-y-2 text-[#EDE6D6]">
              <span className="bg-[#8C3B2E] text-[#EDE6D6] text-xs font-bold px-3 py-1 rounded-full border border-[#B9924C]/40 inline-block">
                Flagship Category
              </span>
              <div className="flex items-center gap-2 text-[#B9924C]">
                <Wrench className="w-6 h-6 text-[#B9924C]" />
                <h3 className="text-2xl font-serif font-bold text-[#EDE6D6]">
                  Hardware & Fasteners
                </h3>
              </div>
              <p className="text-xs text-[#EDE6D6]/80 max-w-md">
                Industrial nut bolts, heavy screws, Dorset locks, Hettich soft-close hinges & brass architectural hardware.
              </p>
              <a href="#hardware" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B9924C] hover:text-[#EDE6D6] pt-2">
                <span>Browse Fasteners Catalog</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bento Item 2: Paints & Finishes (Medium 1x2) */}
          <div className="md:col-span-1 md:row-span-2 relative rounded-3xl neo-dark text-[#EDE6D6] overflow-hidden group border border-[#4A4F52] flex flex-col justify-between p-6">
            <div className="relative h-44 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80"
                alt="Paints & Finishes"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B28] to-transparent"></div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#B9924C]">
                <Paintbrush className="w-5 h-5 text-[#8C3B2E]" />
                <h3 className="text-lg font-serif font-bold text-[#EDE6D6]">
                  Paints & Finishes
                </h3>
              </div>
              <p className="text-xs text-[#EDE6D6]/70">
                Dulux, Asian Paints, Indigo & DUCO luxury emulsions and industrial wood finishes.
              </p>
              <a href="#paints" className="inline-flex items-center gap-1 text-xs font-semibold text-[#B9924C]">
                <span>View Paints</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Bento Item 3: Power Tools (1x1) */}
          <div className="relative rounded-3xl neo-dark text-[#EDE6D6] p-5 border border-[#4A4F52] flex flex-col justify-between group hover:border-[#B9924C] transition-all">
            <div className="flex items-center justify-between">
              <Hammer className="w-6 h-6 text-[#B9924C]" />
              <span className="text-[10px] font-bold text-[#B9924C] bg-[#8C3B2E]/20 px-2 py-0.5 rounded-full border border-[#8C3B2E]/40">
                Pro Grade
              </span>
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#EDE6D6] group-hover:text-[#B9924C] transition-colors">
                Tools & Power Tools
              </h3>
              <p className="text-xs text-[#EDE6D6]/70 line-clamp-2 mt-1">
                Bosch, Stanley, Dewalt drills & cutters.
              </p>
            </div>
          </div>

          {/* Bento Item 4: Plywood & Laminates (1x1) */}
          <div className="relative rounded-3xl neo-dark text-[#EDE6D6] p-5 border border-[#4A4F52] flex flex-col justify-between group hover:border-[#B9924C] transition-all">
            <div className="flex items-center justify-between">
              <Layers className="w-6 h-6 text-[#B9924C]" />
              <span className="text-[10px] font-bold text-[#B9924C] bg-[#8C3B2E]/20 px-2 py-0.5 rounded-full border border-[#8C3B2E]/40">
                Waterproof
              </span>
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#EDE6D6] group-hover:text-[#B9924C] transition-colors">
                Plywood & Laminates
              </h3>
              <p className="text-xs text-[#EDE6D6]/70 line-clamp-2 mt-1">
                Black Cobra, Samrat & Greenlam sheets.
              </p>
            </div>
          </div>

          {/* Bento Item 5: Modular Kitchens (Wide 2x1) */}
          <div className="md:col-span-2 relative rounded-3xl neo-dark text-[#EDE6D6] overflow-hidden group border border-[#4A4F52] p-6 flex items-center justify-between">
            <div className="space-y-2 max-w-xs z-10">
              <span className="text-[10px] font-bold text-[#B9924C] bg-[#8C3B2E]/30 px-2.5 py-0.5 rounded-full border border-[#8C3B2E]/50">
                Sleek & Hettich
              </span>
              <h3 className="text-xl font-serif font-bold text-[#EDE6D6]">
                Modular Kitchens & Wardrobes
              </h3>
              <p className="text-xs text-[#EDE6D6]/70">
                Customized layouts with soft-close mechanisms & premium finishes.
              </p>
            </div>
            <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 neo-dark-inset p-1 border border-[#B9924C]/30 hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80"
                alt="Modular Kitchen"
                className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform"
              />
            </div>
          </div>

          {/* Bento Item 6: Pipes & Sanitary (1x1) */}
          <div className="relative rounded-3xl neo-dark text-[#EDE6D6] p-5 border border-[#4A4F52] flex flex-col justify-between group hover:border-[#B9924C] transition-all">
            <div className="flex items-center justify-between">
              <Droplets className="w-6 h-6 text-[#B9924C]" />
              <span className="text-[10px] font-bold text-[#B9924C] bg-[#8C3B2E]/20 px-2 py-0.5 rounded-full">
                Heavy Duty
              </span>
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#EDE6D6] group-hover:text-[#B9924C] transition-colors">
                Pipes & Sanitary
              </h3>
              <p className="text-xs text-[#EDE6D6]/70 line-clamp-2 mt-1">
                Wavin CPVC pipes & sanitaryware.
              </p>
            </div>
          </div>

          {/* Bento Item 7: Electricals (1x1) */}
          <div className="relative rounded-3xl neo-dark text-[#EDE6D6] p-5 border border-[#4A4F52] flex flex-col justify-between group hover:border-[#B9924C] transition-all">
            <div className="flex items-center justify-between">
              <Zap className="w-6 h-6 text-[#B9924C]" />
              <span className="text-[10px] font-bold text-[#B9924C] bg-[#8C3B2E]/20 px-2 py-0.5 rounded-full">
                Greatwhite
              </span>
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#EDE6D6] group-hover:text-[#B9924C] transition-colors">
                Electricals
              </h3>
              <p className="text-xs text-[#EDE6D6]/70 line-clamp-2 mt-1">
                Modular switches, wires & LED fixtures.
              </p>
            </div>
          </div>

          {/* Bento Item 8: Adhesives & Waterproofing (1x1) */}
          <div className="relative rounded-3xl neo-dark text-[#EDE6D6] p-5 border border-[#4A4F52] flex flex-col justify-between group hover:border-[#B9924C] transition-all">
            <div className="flex items-center justify-between">
              <Sparkles className="w-6 h-6 text-[#B9924C]" />
              <span className="text-[10px] font-bold text-[#B9924C] bg-[#8C3B2E]/20 px-2 py-0.5 rounded-full">
                Fevicol
              </span>
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#EDE6D6] group-hover:text-[#B9924C] transition-colors">
                Adhesives & Chemicals
              </h3>
              <p className="text-xs text-[#EDE6D6]/70 line-clamp-2 mt-1">
                Fevicol, Bostik & Bond Tek sealants.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. SPECIAL FOCUS: BULK PROJECTS & WHOLESALE (Neumorphic Card Split) */}
      <section id="bulk-projects" className="py-20 px-4 bg-[#2B2B28] text-[#EDE6D6] border-y border-[#B9924C]/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side Image Frame */}
          <div className="relative rounded-3xl overflow-hidden border border-[#B9924C]/40 neo-dark p-3 shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80"
              alt="Construction Site Bulk Supply"
              className="w-full h-[440px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B28] via-[#2B2B28]/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-[#B9924C] text-[#2B2B28] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider neo-dark-sm">
                B2B & Contractor Special
              </span>
              <h3 className="text-xl font-serif font-bold text-[#EDE6D6] mt-2">
                Supplying Commercial, Residential & Infrastructure Projects
              </h3>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 neo-dark-sm border border-[#8C3B2E]/50 px-4 py-1.5 rounded-full text-[#B9924C] text-xs font-semibold">
              <Building2 className="w-4 h-4 text-[#8C3B2E]" />
              <span>Wholesale Partner Program</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#EDE6D6] leading-tight">
              Partner with Lali's BuildMart for Your Next Big Project.
            </h2>

            <p className="text-[#EDE6D6]/80 text-base leading-relaxed">
              We specialize in supplying high-quality materials for bulk construction projects. Enjoy priority delivery, dedicated account managers, transparent billing, and exclusive wholesale pricing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Priority Scheduled Site Delivery",
                "Dedicated Key Account Manager",
                "Tiered Wholesale Volume Pricing",
                "Direct Manufacturer Warranties",
              ].map((benefit, idx) => (
                <div key={idx} className="neo-dark-sm p-3 rounded-xl border border-[#4A4F52]/40 flex items-center gap-3 text-xs text-[#EDE6D6]">
                  <CheckCircle2 className="w-4 h-4 text-[#B9924C] shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#wholesale-register"
                className="inline-flex items-center gap-2 bg-[#8C3B2E] hover:bg-[#8C3B2E]/90 text-[#EDE6D6] font-bold px-8 py-4 rounded-2xl neo-dark border border-[#B9924C]/40 transition-all text-base hover:-translate-y-1"
              >
                <span>Open a Wholesale Account</span>
                <ArrowRight className="w-5 h-5 text-[#B9924C]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SPECIAL FOCUS: MODULAR KITCHENS & WARDROBES */}
      <section id="modular-kitchens" className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl overflow-hidden border border-[#B9924C]/40 neo-dark p-8 sm:p-14 shadow-2xl text-[#EDE6D6]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B2B28] via-[#2B2B28]/95 to-[#2B2B28]/60"></div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="neo-dark-sm border border-[#8C3B2E]/60 text-[#B9924C] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Luxury Interior Solutions
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#EDE6D6] tracking-tight">
              Design Your Dream Spaces.
            </h2>
            <p className="text-[#EDE6D6]/80 text-base leading-relaxed">
              Transform your kitchen and bedrooms with sleek modular designs featuring top-tier fittings from Sleek and Hettich. Consult with our interior hardware experts today.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-semibold text-[#EDE6D6]">
              <span className="neo-dark-inset border border-[#4A4F52]/40 px-4 py-2 rounded-xl text-[#B9924C]">
                ✓ Sleek Modular Layouts
              </span>
              <span className="neo-dark-inset border border-[#4A4F52]/40 px-4 py-2 rounded-xl text-[#B9924C]">
                ✓ Hettich Soft-Close Hardware
              </span>
              <span className="neo-dark-inset border border-[#4A4F52]/40 px-4 py-2 rounded-xl text-[#B9924C]">
                ✓ 3D Design Consultation
              </span>
            </div>
            <div>
              <a
                href="#consultation"
                className="inline-flex items-center gap-2 bg-[#8C3B2E] hover:bg-[#8C3B2E]/90 text-[#EDE6D6] font-bold px-8 py-4 rounded-2xl border border-[#B9924C]/40 neo-dark transition-all text-base hover:-translate-y-1"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-5 h-5 text-[#B9924C]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OUR PREMIUM BRANDS (Marquee Carousel) */}
      <section id="our-brands" className="py-14 bg-[#262623] border-y border-[#B9924C]/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-8">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#8C3B2E]">
            Authorized Distributor & Partner
          </h2>
          <p className="text-2xl font-serif font-bold text-[#EDE6D6]">
            Partnered with the Best in the Industry
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee flex items-center gap-6 py-2">
            {[...brands, ...brands].map((brand, idx) => (
              <div
                key={idx}
                className="neo-dark border border-[#4A4F52]/50 hover:border-[#B9924C] px-6 py-3.5 rounded-2xl text-[#EDE6D6] font-semibold text-sm whitespace-nowrap shadow-md hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{brand.logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE LALI'S BUILDMART? */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#8C3B2E]">
            Why Customers Trust Us
          </h2>
          <p className="text-3xl sm:text-5xl font-serif font-bold text-[#2B2B28]">
            Why Choose Lali's BuildMart?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="neo-dark text-[#EDE6D6] p-6 rounded-3xl border border-[#4A4F52]/50 hover:border-[#B9924C] transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl neo-dark-sm text-[#B9924C] border border-[#8C3B2E]/40 flex items-center justify-center text-2xl font-bold">
              🏪
            </div>
            <h3 className="text-lg font-serif font-bold text-[#EDE6D6]">Everything Under One Roof</h3>
            <p className="text-xs text-[#EDE6D6]/70 leading-relaxed">
              No need to visit multiple vendors. From foundation screws to interior decor, get everything in one single order.
            </p>
          </div>

          <div className="neo-dark text-[#EDE6D6] p-6 rounded-3xl border border-[#4A4F52]/50 hover:border-[#B9924C] transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl neo-dark-sm text-[#B9924C] border border-[#8C3B2E]/40 flex items-center justify-center text-2xl font-bold">
              🏷️
            </div>
            <h3 className="text-lg font-serif font-bold text-[#EDE6D6]">Unbeatable Wholesale Prices</h3>
            <p className="text-xs text-[#EDE6D6]/70 leading-relaxed">
              Direct wholesale pricing for maximum savings. Get maximum margins for your bulk contractor orders.
            </p>
          </div>

          <div className="neo-dark text-[#EDE6D6] p-6 rounded-3xl border border-[#4A4F52]/50 hover:border-[#B9924C] transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl neo-dark-sm text-[#B9924C] border border-[#8C3B2E]/40 flex items-center justify-center text-2xl font-bold">
              🛡️
            </div>
            <h3 className="text-lg font-serif font-bold text-[#EDE6D6]">100% Genuine Products</h3>
            <p className="text-xs text-[#EDE6D6]/70 leading-relaxed">
              Sourced directly from authorized manufacturers with official brand guarantees & warranties.
            </p>
          </div>

          <div className="neo-dark text-[#EDE6D6] p-6 rounded-3xl border border-[#4A4F52]/50 hover:border-[#B9924C] transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl neo-dark-sm text-[#B9924C] border border-[#8C3B2E]/40 flex items-center justify-center text-2xl font-bold">
              🚚
            </div>
            <h3 className="text-lg font-serif font-bold text-[#EDE6D6]">Reliable Fleet Delivery</h3>
            <p className="text-xs text-[#EDE6D6]/70 leading-relaxed">
              Prompt and scheduled supply for all construction phases right at your site without delays.
            </p>
          </div>
        </div>
      </section>

      {/* 9. FOOTER SECTION */}
      <footer id="contact" className="bg-[#2B2B28] text-[#EDE6D6] border-t border-[#B9924C]/40 pt-16 pb-8 px-4 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1 (About) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl neo-dark-sm border border-[#B9924C]/40 flex items-center justify-center text-[#B9924C] font-serif font-extrabold text-xl">
                L
              </div>
              <span className="text-xl font-serif font-bold text-[#EDE6D6]">
                Lali's <span className="text-[#B9924C]">BuildMart</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#EDE6D6]/70">
              A 100+ year old retailer and wholesaler for all your construction and repair needs. Supplying genuine paints, power tools, modular kitchens, adhesives, and hardware across the region.
            </p>
            <div className="text-xs font-semibold text-[#B9924C]">
              Est. 1924 • Over a Century of Excellence
            </div>
          </div>

          {/* Column 2 (Quick Links) */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold text-[#B9924C] uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-[#B9924C] transition-colors">
                  About Our Legacy
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#B9924C] transition-colors">
                  Shop Online Catalog
                </a>
              </li>
              <li>
                <a href="#bulk-projects" className="hover:text-[#B9924C] transition-colors">
                  Bulk & Project Inquiries
                </a>
              </li>
              <li>
                <a href="#modular-kitchens" className="hover:text-[#B9924C] transition-colors">
                  Modular Kitchen Studio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#B9924C] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#B9924C] transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 (Contact Info) */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold text-[#B9924C] uppercase tracking-wider">Store Info</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8C3B2E] shrink-0 mt-0.5" />
                <span>Main Hardware Market, GT Road, Building No. 42, New Delhi, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#8C3B2E] shrink-0" />
                <span>+91-98765-43210 / +91-11-23456789</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8C3B2E] shrink-0" />
                <span>sales@lalisbuildmart.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#8C3B2E] shrink-0" />
                <span>Store Hours: Mon - Sat: 9:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4 (Newsletter & Socials) */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold text-[#B9924C] uppercase tracking-wider">Newsletter</h4>
            <p className="text-xs text-[#EDE6D6]/70">
              Subscribe for exclusive wholesale offers, price drops & bulk updates!
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full neo-dark-inset text-xs text-[#EDE6D6] placeholder-[#EDE6D6]/40 px-3 py-2.5 rounded-lg border border-[#4A4F52]/60 focus:outline-none focus:border-[#B9924C]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#8C3B2E] hover:bg-[#8C3B2E]/90 text-[#EDE6D6] font-bold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 neo-dark-sm border border-[#B9924C]/40"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5 text-[#B9924C]" />
              </button>
            </form>

            <div className="pt-2">
              <span className="text-xs text-[#EDE6D6]/60 block mb-2 font-medium">Connect With Us</span>
              <div className="flex gap-2">
                {["Facebook", "Instagram", "WhatsApp", "LinkedIn"].map((social, i) => (
                  <span
                    key={i}
                    className="w-8.5 h-8.5 rounded-xl neo-dark-sm flex items-center justify-center text-xs text-[#EDE6D6] hover:text-[#B9924C] transition-colors cursor-pointer border border-[#4A4F52]/40"
                  >
                    {social[0]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto border-t border-[#4A4F52]/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EDE6D6]/60">
          <div>© 2026 Lali's BuildMart. All Rights Reserved.</div>
          <div>Crafted with Modern Neumorphic & Bento Grid UI.</div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { ChevronRight, Paintbrush, Droplets, Zap, Wrench, Utensils, Layers, LayoutGrid, ShieldAlert, StickyNote, Award, ShieldCheck, Handshake, CheckCircle2, HeadphonesIcon, FileText, Clock, Truck, Package, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const categories = [
    { name: "Paints & Surface Coatings", icon: Paintbrush, img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80" },
    { name: "Plumbing & Sanitary", icon: Droplets, img: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80" },
    { name: "Electrical Supplies", icon: Zap, img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80" },
    { name: "Tools & Accessories", icon: Wrench, img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80" },
    { name: "Kitchens & Digital Locks", icon: Utensils, img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80" },
    { name: "Plywood & Laminates", icon: Layers, img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80" },
  ]; // showing only 6 on homepage

  const processSteps = [
    { num: "01", title: "Requirement Discussion", desc: "Understanding project needs, specifications and schedules.", icon: HeadphonesIcon },
    { num: "02", title: "Quotation within 24 Hrs", desc: "Detailed quotation with transparent pricing.", icon: FileText },
    { num: "03", title: "Material Scheduling", desc: "Planning dispatch timelines according to phases.", icon: Clock },
    { num: "04", title: "Transport Coordination", desc: "Dedicated transport management for smooth delivery.", icon: Truck },
    { num: "05", title: "Site Delivery", desc: "On-time delivery ensuring uninterrupted workflow.", icon: Package },
    { num: "06", title: "Ongoing Support", desc: "Continuous support for additional requirements.", icon: ShieldCheck },
  ];

  return (
    <div className="w-full">
      {/* INTERACTIVE HERO SECTION */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-24 overflow-hidden min-h-[90vh] flex flex-col justify-between bg-slate-100">
         <div className="absolute inset-0 w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" 
              alt="Modern House Construction" 
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay to make text readable but keep the house visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-slate-900/30"></div>
         </div>

         <div className="max-w-7xl mx-auto w-full relative z-20 flex-1 flex flex-col">
             {/* Headline Overlay */}
             <div className="mt-6 md:mt-10 bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] max-w-lg shadow-2xl border border-white/60 relative z-30 lg:-ml-16 xl:-ml-28 transition-transform duration-300">
                 <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#111111] rounded-full mb-4">
                   <Award className="w-3.5 h-3.5 text-yellow-400" />
                   <span className="text-[10px] md:text-xs font-extrabold uppercase tracking-wider text-yellow-400">100+ Years of Excellence</span>
                 </div>
                 <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-[#111111]">
                     Mazboot Saaman, <br/>
                     <span className="text-[#D22027]">Bharosemand Naam.</span>
                 </h1>
                 <p className="mt-4 text-gray-600 font-semibold leading-relaxed text-sm md:text-base">
                     We power your projects with dependable supply. Interact with the house model or explore our core material categories:
                 </p>
                 <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
                   {[
                     "Plywood & Laminates",
                     "Tools & Accessories",
                     "Panels & Clads",
                     "Waterproofing",
                     "Electrical Supplies",
                     "Paints & Coatings",
                     "Plumbing & Sanitary",
                     "Kitchens & Locks",
                     "Flooring & Adhesives"
                   ].map((catName, idx) => (
                     <Link
                       key={idx}
                       href="/products"
                       className="text-xs md:text-sm text-slate-600 hover:text-[#D22027] font-bold flex items-center gap-2 group/item transition-colors"
                     >
                       <span className="w-1.5 h-1.5 rounded-full bg-[#D22027]/40 group-hover/item:bg-[#D22027] transition-colors shrink-0"></span>
                       {catName}
                     </Link>
                   ))}
                 </div>
                 <div className="mt-8 flex gap-3">
                   <Link href="/products" className="bg-[#111111] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#D22027] transition-all shadow-lg hover:shadow-red-500/20">
                     View Catalog
                   </Link>
                 </div>
             </div>
             
             {/* Interactive Canvas Area */}
             <div className="absolute inset-0 w-full h-full pointer-events-none">
               
               {/* Hotspot 1: Paints & Coatings */}
               <div className="absolute top-[16%] left-[48%] pointer-events-auto group z-20 hover:z-50">
                 <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                    <div className="relative w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,200,0,0.6)] cursor-pointer hover:scale-110 transition-transform">
                      <Paintbrush className="w-4 h-4 text-[#111111]" />
                    </div>
                    {/* Popover */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 md:w-64 bg-white p-4 rounded-2xl shadow-2xl opacity-0 -translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                       <div className="font-bold text-[#111111] mb-1">Paints & Coatings</div>
                       <p className="text-xs text-gray-500 mb-3">Dulux, Birla Opus, Asian Paints, ICA Pidilite, Indigo, etc.</p>
                       <Link href="/products" className="text-xs font-bold text-[#D22027] flex items-center gap-1 hover:underline">Explore <ChevronRight className="w-3 h-3"/></Link>
                    </div>
                 </div>
               </div>

               {/* Hotspot 2: Panels & Clads */}
               <div className="absolute top-[32%] left-[64%] pointer-events-auto group z-20 hover:z-50">
                 <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75" style={{animationDelay: "0.3s"}}></div>
                    <div className="relative w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,200,0,0.6)] cursor-pointer hover:scale-110 transition-transform">
                      <LayoutGrid className="w-4 h-4 text-[#111111]" />
                    </div>
                    {/* Popover */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 md:w-64 bg-white p-4 rounded-2xl shadow-2xl opacity-0 -translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                       <div className="font-bold text-[#111111] mb-1">Panels & Clads</div>
                       <p className="text-xs text-gray-500 mb-3">Alex, Greenlam, Merino, Vox, etc.</p>
                       <Link href="/products" className="text-xs font-bold text-[#D22027] flex items-center gap-1 hover:underline">Explore <ChevronRight className="w-3 h-3"/></Link>
                    </div>
                 </div>
               </div>

               {/* Hotspot 3: Waterproofing */}
               <div className="absolute top-[24%] left-[78%] pointer-events-auto group z-20 hover:z-50">
                 <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75" style={{animationDelay: "0.6s"}}></div>
                    <div className="relative w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,200,0,0.6)] cursor-pointer hover:scale-110 transition-transform">
                      <ShieldAlert className="w-4 h-4 text-[#111111]" />
                    </div>
                    {/* Popover */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 md:w-64 bg-white p-4 rounded-2xl shadow-2xl opacity-0 -translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                       <div className="font-bold text-[#111111] mb-1">Waterproofing</div>
                       <p className="text-xs text-gray-500 mb-3">Bostik, Dr. Fixit, etc.</p>
                       <Link href="/products" className="text-xs font-bold text-[#D22027] flex items-center gap-1 hover:underline">Explore <ChevronRight className="w-3 h-3"/></Link>
                    </div>
                 </div>
               </div>

               {/* Hotspot 4: Plumbing & Sanitary */}
               <div className="absolute top-[42%] left-[74%] pointer-events-auto group z-20 hover:z-50">
                 <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75" style={{animationDelay: "0.9s"}}></div>
                    <div className="relative w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,200,0,0.6)] cursor-pointer hover:scale-110 transition-transform">
                      <Droplets className="w-4 h-4 text-[#111111]" />
                    </div>
                    {/* Popover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 md:w-64 bg-white p-4 rounded-2xl shadow-2xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                       <div className="font-bold text-[#111111] mb-1">Plumbing & Sanitary</div>
                       <p className="text-xs text-gray-500 mb-3">Supreme, Vectus, Racold, Hindware, Essel, etc.</p>
                       <Link href="/products" className="text-xs font-bold text-[#D22027] flex items-center gap-1 hover:underline">Explore <ChevronRight className="w-3 h-3"/></Link>
                    </div>
                 </div>
               </div>

               {/* Hotspot 5: Kitchens & Locks */}
               <div className="absolute top-[50%] left-[58%] pointer-events-auto group z-20 hover:z-50">
                 <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75" style={{animationDelay: "1.2s"}}></div>
                    <div className="relative w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,200,0,0.6)] cursor-pointer hover:scale-110 transition-transform">
                      <Utensils className="w-4 h-4 text-[#111111]" />
                    </div>
                    {/* Popover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 md:w-64 bg-white p-4 rounded-2xl shadow-2xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                       <div className="font-bold text-[#111111] mb-1">Kitchen Hardware</div>
                       <p className="text-xs text-gray-500 mb-3">Hafele, Dorset, Sleek, Harrison, etc.</p>
                       <Link href="/products" className="text-xs font-bold text-[#D22027] flex items-center gap-1 hover:underline">Explore <ChevronRight className="w-3 h-3"/></Link>
                    </div>
                 </div>
               </div>

               {/* Hotspot 6: Electrical Supplies */}
               <div className="absolute top-[52%] left-[44%] pointer-events-auto group z-20 hover:z-50">
                 <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75" style={{animationDelay: "1.5s"}}></div>
                    <div className="relative w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,200,0,0.6)] cursor-pointer hover:scale-110 transition-transform">
                      <Zap className="w-4 h-4 text-[#111111]" />
                    </div>
                    {/* Popover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 md:w-64 bg-white p-4 rounded-2xl shadow-2xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                       <div className="font-bold text-[#111111] mb-1">Electrical Supplies</div>
                       <p className="text-xs text-gray-500 mb-3">GreatWhite, etc.</p>
                       <Link href="/products" className="text-xs font-bold text-[#D22027] flex items-center gap-1 hover:underline">Explore <ChevronRight className="w-3 h-3"/></Link>
                    </div>
                 </div>
               </div>

               {/* Hotspot 7: Plywood & Laminates */}
               <div className="absolute top-[64%] left-[36%] pointer-events-auto group z-20 hover:z-50">
                 <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75" style={{animationDelay: "0.4s"}}></div>
                    <div className="relative w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,200,0,0.6)] cursor-pointer hover:scale-110 transition-transform">
                      <Layers className="w-4 h-4 text-[#111111]" />
                    </div>
                    {/* Popover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 md:w-64 bg-white p-4 rounded-2xl shadow-2xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                       <div className="font-bold text-[#111111] mb-1">Plywood & Laminates</div>
                       <p className="text-xs text-gray-500 mb-3">Greenply, Archidply, Greenlam Laminates, Virgo, etc.</p>
                       <Link href="/products" className="text-xs font-bold text-[#D22027] flex items-center gap-1 hover:underline">Explore <ChevronRight className="w-3 h-3"/></Link>
                    </div>
                 </div>
               </div>

               {/* Hotspot 8: Tools & Accessories */}
               <div className="absolute top-[68%] left-[70%] pointer-events-auto group z-20 hover:z-50">
                 <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75" style={{animationDelay: "0.8s"}}></div>
                    <div className="relative w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,200,0,0.6)] cursor-pointer hover:scale-110 transition-transform">
                      <Wrench className="w-4 h-4 text-[#111111]" />
                    </div>
                    {/* Popover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 md:w-64 bg-white p-4 rounded-2xl shadow-2xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                       <div className="font-bold text-[#111111] mb-1">Tools & Accessories</div>
                       <p className="text-xs text-gray-500 mb-3">DeWalt, Makita, Bosch, Stanley, Black & Decker, etc.</p>
                       <Link href="/products" className="text-xs font-bold text-[#D22027] flex items-center gap-1 hover:underline">Explore <ChevronRight className="w-3 h-3"/></Link>
                    </div>
                 </div>
               </div>

               {/* Hotspot 9: Flooring & Adhesives */}
               <div className="absolute top-[76%] left-[52%] pointer-events-auto group z-20 hover:z-50">
                 <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75" style={{animationDelay: "1.1s"}}></div>
                    <div className="relative w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,200,0,0.6)] cursor-pointer hover:scale-110 transition-transform">
                      <LayoutGrid className="w-4 h-4 text-[#111111]" />
                    </div>
                    {/* Popover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 md:w-64 bg-white p-4 rounded-2xl shadow-2xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                       <div className="font-bold text-[#111111] mb-1">Flooring & Adhesives</div>
                       <p className="text-xs text-gray-500 mb-3">Vox, GreenPanel, JSW, Action Tesa, Fevicol, etc.</p>
                       <Link href="/products" className="text-xs font-bold text-[#D22027] flex items-center gap-1 hover:underline">Explore <ChevronRight className="w-3 h-3"/></Link>
                    </div>
                 </div>
               </div>
             </div>

             {/* Bottom Instruction Bar */}
             <div className="mt-auto self-center md:self-start bg-black/60 backdrop-blur-md px-5 py-3 rounded-full flex items-center gap-3 border border-white/20 relative z-30 shadow-xl mb-4">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                <span className="text-[11px] md:text-xs font-bold text-white tracking-widest uppercase">Hover hotspots to explore services</span>
             </div>
         </div>
      </section>

      {/* THREE PILLARS (About Us) */}
      <section className="py-20 px-4 md:px-8 bg-white relative z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#111111] tracking-tight mb-4">Building Partnerships.</h2>
            <p className="text-gray-500 text-lg">Whether it's a small upgrade or a large project, we deliver solutions for every scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: HeadphonesIcon, title: "Dedicated After-Sales Service", desc: "We stand by our products long after the delivery is complete." },
               { icon: ShieldCheck, title: "End-to-End Warranty Support", desc: "Hassle-free warranty claims and replacements on all top brands." },
               { icon: Handshake, title: "Seamless Brand Coordination", desc: "Direct ties with manufacturers ensure authentic materials and priority support." }
             ].map((feature, i) => (
               <div key={i} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-red-200 hover:shadow-2xl hover:shadow-red-900/5 transition-all duration-300">
                  <div className="w-14 h-14 bg-red-50 text-[#D22027] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#D22027] group-hover:text-white transition-all duration-300">
                     <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111111] mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* STRENGTH IN NUMBERS */}
      <section className="py-24 px-4 md:px-8 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-16">
            <span className="text-[#D22027]">Strength</span> in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
             {[
               { num: "100+", label: "Years in Business" },
               { num: "300+", label: "Active Contractors" },
               { num: "1000+", label: "Projects Supplied" },
               { num: "13,500+", label: "Products" },
             ].map((stat, i) => (
               <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2">{stat.num}</div>
                  <div className="text-sm md:text-base font-semibold text-gray-400">{stat.label}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* PRODUCT RANGE (Preview Grid) */}
      <section className="py-24 px-4 md:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
             <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-1 bg-[#D22027]"></div>
                  <span className="text-sm font-bold uppercase tracking-widest text-[#D22027]">Catalog Preview</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#111111] tracking-tight">Our Core Categories</h2>
             </div>
             <Link href="/products" className="text-[#D22027] font-bold flex items-center gap-2 hover:underline">
               View All 9 Categories <ChevronRight className="w-4 h-4" />
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, index) => (
              <div 
                key={index} 
                className="group relative h-[320px] rounded-3xl overflow-hidden cursor-pointer shadow-lg bg-white"
              >
                 <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                 <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-white/20 group-hover:bg-[#D22027] group-hover:border-[#D22027] transition-colors duration-300">
                        <cat.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 leading-tight">{cat.name}</h3>
                    <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Explore Category <ChevronRight className="w-4 h-4" />
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 px-4 md:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#111111] tracking-tight mb-6">
                Why Choose <br/><span className="text-[#D22027]">Lali's Buildmart</span>
              </h2>
              <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                We are the preferred choice for major infrastructure projects, luxury hotels, and residential developers across the region because we deliver on our promises.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Top Brands at Unbeatable Prices", "Best Price Guaranteed",
                  "Expertise from Industry Leaders", "Large Inventory Availability",
                  "Special Pricing for Bulk Orders", "Transparent Billing System"
                ].map((reason, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                       <CheckCircle2 className="w-5 h-5 text-[#D22027]" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm md:text-base">{reason}</span>
                  </div>
                ))}
              </div>
           </div>
           <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 rounded-[3rem] transform translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" 
                alt="Construction Team" 
                className="relative z-10 rounded-[3rem] w-full object-cover aspect-[4/3] shadow-2xl grayscale hover:grayscale-0 transition-all duration-500" 
              />
           </div>
        </div>
      </section>

      {/* SITE SUPPLY PROCESS */}
      <section className="py-24 px-4 md:px-8 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#D22027] skew-x-[-20deg] opacity-10 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Site Supply Process</h2>
            <p className="text-gray-400 text-lg">A streamlined, 6-step workflow designed to keep your construction on schedule.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Central Timeline Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-white/10 md:-translate-x-1/2"></div>
            
            <div className="space-y-12 md:space-y-0">
              {processSteps.map((step, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16`}>
                    
                    {/* Content Box */}
                    <div className={`ml-16 md:ml-0 flex-1 w-full ${isEven ? 'md:text-right' : 'md:text-left'} group`}>
                      <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 inline-block w-full max-w-md relative overflow-hidden">
                        <div className={`absolute ${isEven ? 'left-2 md:left-6' : 'right-2 md:right-6'} top-2 md:top-4 text-8xl font-black text-white/5 group-hover:text-white/10 transition-colors pointer-events-none`}>{step.num}</div>
                        <h3 className="text-2xl font-bold mb-3 text-white relative z-10">{step.title}</h3>
                        <p className="text-gray-400 text-base leading-relaxed relative z-10">{step.desc}</p>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 bg-slate-900 border-4 border-[#D22027] rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(210,32,39,0.4)]">
                       <step.icon className="w-5 h-5 text-yellow-400" />
                    </div>

                    {/* Empty Div for layout balance on Desktop */}
                    <div className="hidden md:block flex-1"></div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

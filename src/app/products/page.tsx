"use client";
import { Paintbrush, Droplets, Zap, Wrench, Utensils, Layers, LayoutGrid, ShieldAlert, StickyNote, ChevronRight } from "lucide-react";

export default function ProductsPage() {
  const categories = [
    { name: "Paints & Surface Coatings", icon: Paintbrush, img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80", brands: "Dulux, Asian Paints, Indigo, Birla Opus" },
    { name: "Plumbing & Sanitary", icon: Droplets, img: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80", brands: "Geberit, Vectus, Supreme, Hindware" },
    { name: "Electrical Supplies", icon: Zap, img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80", brands: "GreatWhite, Racold" },
    { name: "Tools & Accessories", icon: Wrench, img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80", brands: "Bosch, Dewalt, Stanley, Ingco" },
    { name: "Kitchens & Locks", icon: Utensils, img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80", brands: "Hafele, Hettich, Dorset, Yale" },
    { name: "Plywood & Laminates", icon: Layers, img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80", brands: "Greenply, Greenpanel, Black Cobra" },
    { name: "Flooring", icon: LayoutGrid, img: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=600&q=80", brands: "Action Tesa, Virgo" },
    { name: "Waterproofing", icon: ShieldAlert, img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80", brands: "Dr Fixit, Bostik" },
    { name: "Tile Adhesives", icon: StickyNote, img: "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?auto=format&fit=crop&w=600&q=80", brands: "Fevicol, Roff, MYK arment, Jivanjor" },
  ];

  return (
    <div className="pt-24 bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-black text-[#111111] mb-4">Complete <span className="text-[#D22027]">Product Catalog</span></h1>
        <p className="text-xl text-gray-500 mb-12 max-w-3xl">Explore our 9 primary categories housing over 13,500 distinct SKUs from 90+ industry-leading brands.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-100 transition-all duration-300 group">
               <div className="h-48 overflow-hidden relative">
                 <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               </div>
               <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-2 bg-yellow-400 rounded-lg text-black"><cat.icon className="w-5 h-5"/></div>
                     <h2 className="text-xl font-bold text-[#111111]">{cat.name}</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-6 font-medium">Top Brands: {cat.brands}</p>
                  <button className="text-[#D22027] font-bold flex items-center gap-2 hover:gap-4 transition-all">
                    Request Catalog <ChevronRight className="w-4 h-4" />
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

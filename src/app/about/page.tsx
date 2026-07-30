"use client";
import { Award, Target, BookOpen, Users, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-24 bg-white min-h-screen">
      <div className="bg-[#111111] text-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">Our <span className="text-[#D22027]">Legacy</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Since 1924, Lali's Buildmart has been the cornerstone of construction in Dharamshala, delivering quality, trust, and massive scale.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" alt="Warehouse" className="rounded-3xl shadow-2xl" />
        </div>
        <div className="space-y-8">
          <h2 className="text-4xl font-black text-[#111111]">Building Partnerships. <br/>Not Just Supplying Material.</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            What started as a small hardware store a century ago has grown into the region's largest building materials supplier. With over 25,000 sq ft of warehouse space and a catalog of 13,500+ products, we are uniquely positioned to supply mega-projects without delay.
          </p>
          <div className="space-y-4">
             <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <Target className="w-8 h-8 text-[#D22027]" />
                <div><h3 className="font-bold text-[#111111]">Our Mission</h3><p className="text-sm text-gray-500">To provide uncompromising quality and fair wholesale pricing.</p></div>
             </div>
             <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <BookOpen className="w-8 h-8 text-[#D22027]" />
                <div><h3 className="font-bold text-[#111111]">Our Core Values</h3><p className="text-sm text-gray-500">Integrity, Transparency, and Timeliness in every transaction.</p></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

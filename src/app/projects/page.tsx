"use client";
import { Building, GraduationCap, Building2 } from "lucide-react";

export default function ProjectsPage() {
  const hospitality = ["The Taj, Dharamshala", "Hyatt Regency Dharamshala", "Radisson Blu Dharamshala", "D'Polo Hotels & Resorts", "Lemon Tree, Dharamshala", "Sarovar Portico, Dharamshala", "Maximus Mall, Dharamshala", "Hotel Nature Valley, Dalhousie"];
  const institutions = ["Norbulingka Institute", "Chinmaya Tapovan Ashram", "Gyuto Tantric Monastery", "Namgyal Monastery", "Himalayan Iyengar Yoga Center", "Achiever's Hub Public School", "Delhi Public School, Kangra", "Dharamshala Skyway (Ropeway)", "Central University, Himachal Pradesh", "TMAI Tibetan Clinic", "Library of Tibetan Works and Archives", "Tibetan Children Village School", "Aditya Vihar Society, Shimla", "Dzongsar Khyentse Chokyi", "Lodro College of Dialectics, Chauntra"];
  const government = ["HIMUDA", "Smart City Dharamshala", "HPCA Cricket Stadium", "HP PWD"];

  return (
    <div className="pt-24 bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-black text-[#111111] mb-6">Our <span className="text-[#D22027]">Trusted Clients</span></h1>
          <p className="text-xl text-gray-500">
            Supplying trusted materials to leading hotels, institutions, and construction projects across the region.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Hospitality */}
           <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-red-100 text-[#D22027] rounded-xl flex items-center justify-center"><Building className="w-6 h-6"/></div>
                 <h2 className="text-2xl font-bold text-[#111111]">Hospitality & Hotels</h2>
              </div>
              <ul className="space-y-4">
                 {hospitality.map((client, i) => (
                   <li key={i} className="flex items-center gap-3 text-gray-600 font-medium">
                     <span className="w-2 h-2 rounded-full bg-yellow-400"></span> {client}
                   </li>
                 ))}
              </ul>
           </div>

           {/* Institutions */}
           <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-red-100 text-[#D22027] rounded-xl flex items-center justify-center"><GraduationCap className="w-6 h-6"/></div>
                 <h2 className="text-2xl font-bold text-[#111111]">Institutions & Orgs</h2>
              </div>
              <ul className="space-y-4">
                 {institutions.map((client, i) => (
                   <li key={i} className="flex items-center gap-3 text-gray-600 font-medium">
                     <span className="w-2 h-2 rounded-full bg-yellow-400"></span> {client}
                   </li>
                 ))}
              </ul>
           </div>

           {/* Government */}
           <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-red-100 text-[#D22027] rounded-xl flex items-center justify-center"><Building2 className="w-6 h-6"/></div>
                 <h2 className="text-2xl font-bold text-[#111111]">Govt & Industrial</h2>
              </div>
              <ul className="space-y-4">
                 {government.map((client, i) => (
                   <li key={i} className="flex items-center gap-3 text-gray-600 font-medium">
                     <span className="w-2 h-2 rounded-full bg-yellow-400"></span> {client}
                   </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}

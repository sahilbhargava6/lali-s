"use client";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-24 bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-[#111111] mb-6">Let's <span className="text-[#D22027]">Connect</span></h1>
            <p className="text-xl text-gray-500 mb-12 max-w-md">
              Whether you need a bulk quotation, have a product inquiry, or want to partner with us, our team is ready to help.
            </p>

            <div className="space-y-8">
               <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="p-3 bg-yellow-400 rounded-xl"><Phone className="w-6 h-6 text-black"/></div>
                  <div>
                    <h3 className="font-bold text-lg text-[#111111] mb-1">Call Us</h3>
                    <p className="text-gray-500">+91 80916 03100</p>
                    <p className="text-gray-500">+91 80916 04100</p>
                  </div>
               </div>
               
               <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="p-3 bg-yellow-400 rounded-xl"><Mail className="w-6 h-6 text-black"/></div>
                  <div>
                    <h3 className="font-bold text-lg text-[#111111] mb-1">Email Us</h3>
                    <p className="text-gray-500">lalisbuildmart@gmail.com</p>
                  </div>
               </div>

               <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="p-3 bg-yellow-400 rounded-xl"><MapPin className="w-6 h-6 text-black"/></div>
                  <div>
                    <h3 className="font-bold text-lg text-[#111111] mb-1">Visit Us</h3>
                    <p className="text-gray-500">Near ITI, Dari, Dharamshala, <br/>Himachal Pradesh, 176057</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100">
             <h2 className="text-3xl font-black text-[#111111] mb-8">Request a Bulk Quote</h2>
             <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                     <input type="text" className="w-full bg-slate-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#D22027] focus:ring-1 focus:ring-[#D22027]" placeholder="John" />
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                     <input type="text" className="w-full bg-slate-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#D22027] focus:ring-1 focus:ring-[#D22027]" placeholder="Doe" />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                   <input type="email" className="w-full bg-slate-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#D22027] focus:ring-1 focus:ring-[#D22027]" placeholder="john@example.com" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Interested In</label>
                   <select className="w-full bg-slate-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#D22027] focus:ring-1 focus:ring-[#D22027] text-gray-600">
                      <option>Paints & Surface Coatings</option>
                      <option>Plumbing & Sanitary Products</option>
                      <option>Electrical Supplies</option>
                      <option>Bulk Cement / TMT</option>
                      <option>Other / Mixed Order</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Project Details</label>
                   <textarea rows={4} className="w-full bg-slate-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#D22027] focus:ring-1 focus:ring-[#D22027]" placeholder="Tell us about your requirements..."></textarea>
                </div>
                <button type="submit" className="w-full bg-[#111111] hover:bg-[#D22027] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                   Send Request <Send className="w-4 h-4" />
                </button>
             </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}

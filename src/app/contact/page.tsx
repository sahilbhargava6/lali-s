"use client";
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // TODO: Replace YOUR_FORMSPREE_ID with the actual Formspree endpoint ID (e.g., xojebqwe)
      // Example: const endpoint = "https://formspree.io/f/xojebqwe";
      const endpoint = "https://formspree.io/f/YOUR_FORMSPREE_ID"; 
      
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

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
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden">
             
             {/* Success Overlay */}
             <div className={`absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-8 text-center transition-all duration-500 ${status === "success" ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                   <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-[#111111] mb-2">Request Sent!</h3>
                <p className="text-gray-500 mb-8">Thank you for reaching out. Our sales team will review your requirements and get back to you with a quotation within 24 hours.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-8 rounded-xl transition-colors"
                >
                  Send Another Request
                </button>
             </div>

             <h2 className="text-3xl font-black text-[#111111] mb-8">Request a Bulk Quote</h2>
             
             {status === "error" && (
               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                 Oops! There was a problem submitting your form. Please try again later or email us directly.
               </div>
             )}

             <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                     <input type="text" name="firstName" required className="w-full bg-slate-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#D22027] focus:ring-1 focus:ring-[#D22027]" placeholder="John" />
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                     <input type="text" name="lastName" required className="w-full bg-slate-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#D22027] focus:ring-1 focus:ring-[#D22027]" placeholder="Doe" />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                   <input type="email" name="email" required className="w-full bg-slate-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#D22027] focus:ring-1 focus:ring-[#D22027]" placeholder="john@example.com" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Interested In</label>
                   <select name="category" required className="w-full bg-slate-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#D22027] focus:ring-1 focus:ring-[#D22027] text-gray-600">
                      <option value="Paints">Paints & Surface Coatings</option>
                      <option value="Plumbing">Plumbing & Sanitary Products</option>
                      <option value="Electrical">Electrical Supplies</option>
                      <option value="Bulk">Bulk Cement / TMT</option>
                      <option value="Other">Other / Mixed Order</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Project Details</label>
                   <textarea name="message" required rows={4} className="w-full bg-slate-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#D22027] focus:ring-1 focus:ring-[#D22027]" placeholder="Tell us about your requirements..."></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full bg-[#111111] hover:bg-[#D22027] disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                   {status === "loading" ? (
                     <>Sending... <Loader2 className="w-5 h-5 animate-spin" /></>
                   ) : (
                     <>Send Request <Send className="w-4 h-4" /></>
                   )}
                </button>
             </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}

import { Phone, Mail, MapPin, Building2, Truck } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111111] pt-14 md:pt-20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D22027] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
            <div className="sm:col-span-2">
               <div className="mb-6 block">
                  <img src="/Logo-wb.png" alt="Lalisons Buildmart" className="h-10 w-auto object-contain brightness-0 invert" />
               </div>
               <p className="text-gray-400 max-w-sm mb-8">
                  We power your projects with dependable supply, fair pricing, and delivery you can count on.
               </p>
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:bg-[#D22027] transition-colors cursor-pointer"><Building2 className="text-white w-5 h-5"/></div>
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:bg-[#D22027] transition-colors cursor-pointer"><Truck className="text-white w-5 h-5"/></div>
               </div>
            </div>
            
            <div>
               <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
               <div className="space-y-4">
                  <a href="tel:+918091603100" className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors">
                     <Phone className="w-5 h-5" /> +91 80916 03100
                  </a>
                  <a href="tel:+918091604100" className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors">
                     <Phone className="w-5 h-5" /> +91 80916 04100
                  </a>
                  <a href="mailto:lalisbuildmart@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors">
                     <Mail className="w-5 h-5 shrink-0" /> <span className="break-all">lalisbuildmart@gmail.com</span>
                  </a>
               </div>
            </div>

            <div>
               <h4 className="text-lg font-bold text-white mb-6">Address</h4>
               <div className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 shrink-0 mt-1" />
                  <p>Near ITI, Dari, Dharamshala, <br/>Himachal Pradesh, 176057</p>
               </div>
            </div>
         </div>
         
         {/* Extra bottom padding on small screens keeps links clear of the floating WhatsApp button */}
         <div className="border-t border-white/10 pt-8 pb-24 md:pb-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-gray-500 text-sm">© 2026 Lalisons Buildmart Pvt. Ltd. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-gray-500">
               <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
               <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
         </div>
      </div>
    </footer>
  );
}

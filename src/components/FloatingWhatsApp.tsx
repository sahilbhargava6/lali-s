"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918091603100?text=Hi%2C%20I%20would%20like%20to%20request%20a%20bulk%20quote."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] md:bottom-6 md:right-6 z-40 bg-green-500 text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 hover:-translate-y-1 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
    </a>
  );
}

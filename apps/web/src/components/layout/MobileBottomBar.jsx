import React from 'react';
import { Phone, MessageSquare, Car } from 'lucide-react';
import { getWhatsAppUrl, getCallUrl } from '../../lib/whatsapp';

export function MobileBottomBar({ onOpenBooking }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-brand-border px-3 pt-2.5 pb-[calc(0.6rem+env(safe-area-inset-bottom))] sm:hidden shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call */}
        <a
          href={getCallUrl()}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-brand-subtle border border-brand-border text-slate-800 active:bg-brand-border transition-all text-[11px] font-bold gap-1 min-h-[44px]"
          aria-label="Call WhiteCabz Directly"
        >
          <Phone className="w-4 h-4 text-brand-gold" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp with auto-typed message */}
        <a
          href={getWhatsAppUrl('Hello WhiteCabz, I want to book a cab right away. Please share available cabs and lowest fare quote.')}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#1B8743] active:bg-[#25D366]/25 transition-all text-[11px] font-bold gap-1 min-h-[44px]"
          aria-label="WhatsApp WhiteCabz"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
          <span>WhatsApp</span>
        </a>

        {/* Book */}
        <button
          onClick={() => onOpenBooking()}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-dark text-white active:scale-95 transition-all text-[11px] font-bold gap-1 shadow-gold-glow min-h-[44px]"
          aria-label="Open Booking Form"
        >
          <Car className="w-4 h-4 text-white" />
          <span>Book Cab</span>
        </button>
      </div>
    </div>
  );
}

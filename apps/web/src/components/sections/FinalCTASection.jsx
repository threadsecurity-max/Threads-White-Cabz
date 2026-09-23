import React from 'react';
import { MessageSquare, Phone, Car } from 'lucide-react';
import { Button } from '../ui/Button';
import { getWhatsAppUrl, getCallUrl, DISPLAY_PHONE } from '../../lib/whatsapp';

export function FinalCTASection({ onOpenBooking }) {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="fluid-container">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-white to-[#F7F2E6] border border-brand-gold/40 p-8 sm:p-14 lg:p-16 text-center shadow-premium space-y-7">
          {/* Background Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,179,106,0.22)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-3.5">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-gold-50 text-brand-gold-dark border border-brand-gold-200">
              Ready When You Are
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display">
              Wherever You're Going, Start With WhiteCabz.
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Tell us your destination and we'll help you plan the right ride with reliable chauffeurs and zero hidden charges.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Button
              onClick={() => onOpenBooking()}
              variant="gold"
              size="lg"
              className="shadow-gold-glow w-full sm:w-auto"
            >
              <Car className="w-5 h-5 text-white" />
              <span>Book a Cab</span>
            </Button>

            <a
              href={getWhatsAppUrl('Hello WhiteCabz, I would like to book a cab.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-[#25D366] text-white font-bold hover:bg-[#20BA5A] transition-all text-base shadow-md w-full sm:w-auto min-h-[50px]"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href={getCallUrl()}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-slate-800 border border-brand-border hover:border-brand-gold/60 transition-all text-base font-semibold w-full sm:w-auto min-h-[50px] shadow-xs"
            >
              <Phone className="w-5 h-5 text-brand-gold" />
              <span>Call Now ({DISPLAY_PHONE})</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

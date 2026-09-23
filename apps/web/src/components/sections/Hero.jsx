import React from 'react';
import { Sparkles, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { BookingWidget } from '../booking/BookingWidget';

export function Hero({ onOpenBooking }) {

  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 overflow-hidden flex flex-col justify-center">
      {/* Ambient background champagne warm radial glow */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,900px)] h-[500px] bg-[radial-gradient(circle,rgba(212,179,106,0.15)_0%,rgba(250,248,245,0)_70%)] pointer-events-none -z-10" />

      <div className="fluid-container w-full">
        {/* Main 2-Column Hero Grid: Left (Headline + Hero Image), Right (Booking Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Headline, Info & Premium Hero Vehicle Visual */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold-50 border border-brand-gold-300 text-xs font-bold text-brand-gold-dark shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Jalandhar's Premier Chauffeured Mobility</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.12] font-display">
                Your Journey.{' '}
                <span className="gold-text-gradient block sm:inline">
                  Our Commitment.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Premium cab and taxi services from Jalandhar to Delhi, Chandigarh, Amritsar, major airports (ATQ, IGI, IXC, AIP), pilgrimage yatras, hill stations, and pan-India destinations.
              </p>
            </div>

            {/* Premium Hero Visual with Hero.jpg */}
            <div className="relative pt-1 group">
              <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-3xl overflow-hidden border border-brand-border shadow-premium bg-gradient-to-tr from-brand-subtle to-white">
                <img
                  src="/images/Hero.jpg"
                  alt="WhiteCabz Premium Fleet & Chauffeured Mobility"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  loading="eager"
                />
                
                {/* Subtle gradient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                {/* Badges on hero image */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-slate-900 border border-brand-border shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>24x7 Active Fleet Dispatch</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-bold text-white">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Verified Chauffeurs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Value Check Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-1">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Drivers</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-gold" /> Clean Sanitized Fleet</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-gold" /> 24×7 Human Dispatch</span>
            </div>
          </div>

          {/* Right Column: Prominent Booking Form Widget */}
          <div className="lg:col-span-5 sticky top-24">
            <BookingWidget onOpenBooking={onOpenBooking} />
          </div>
        </div>
      </div>
    </section>
  );
}

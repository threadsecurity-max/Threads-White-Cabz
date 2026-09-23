import React from 'react';
import { Badge } from '../components/ui/Badge';
import { ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function AboutPage({ onOpenBooking }) {
  return (
    <div className="pt-28 sm:pt-32 pb-24 fluid-container space-y-16 sm:space-y-20">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5">
        <Badge variant="gold">About WhiteCabz</Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 font-display">
          Redefining Chauffeur Mobility in North India
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
          Founded in Jalandhar, WhiteCabz was built to replace uncertain taxi bookings and surge pricing with genuine dependability, pristine vehicles, and professional chauffeurs.
        </p>
      </div>

      {/* Brand Values Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="space-y-5">
          <Badge variant="silver">Our Philosophy</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-display">
            A Transportation Company Built on Human Trust
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            We believe that long-distance and airport journeys shouldn’t feel stressful. Our approach combines structured operational coordination with respectful, experienced chauffeurs who prioritize your safety and comfort above all else.
          </p>

          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Verified Drivers</h4>
                <p className="text-xs text-slate-500">Thorough background checks, highway experience, and customer-first etiquette.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Sanitized & Climate-Controlled</h4>
                <p className="text-xs text-slate-500">Regular inspections and deep cleaning before every single dispatch.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Transparent Pricing</h4>
                <p className="text-xs text-slate-500">No hidden surge charges or arbitrary return vehicle fees.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden bg-white border border-brand-border p-3 shadow-premium">
          <img
            src="/images/Confidence.jpg"
            alt="WhiteCabz Chauffeur & Trust"
            className="w-full h-72 sm:h-96 object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-br from-[#FFFDF9] via-white to-[#F7F2E6] rounded-3xl p-8 sm:p-12 text-center border border-brand-gold/30 shadow-premium space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
          Experience The WhiteCabz Difference
        </h3>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Book your next intercity or airport journey with WhiteCabz today.
        </p>
        <div className="pt-2">
          <Button onClick={() => onOpenBooking()} variant="gold" size="lg">
            Book a Cab Now
          </Button>
        </div>
      </div>
    </div>
  );
}

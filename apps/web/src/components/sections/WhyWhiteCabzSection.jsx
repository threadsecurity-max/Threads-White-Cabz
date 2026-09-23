import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function WhyWhiteCabzSection({ onOpenBooking }) {
  const benefits = [
    'Professional, courteous and verified highway chauffeurs',
    'Clean, sanitized, and impeccably maintained vehicles',
    '24×7 human coordinator support with live assistance',
    'Flexible one-way and round-trip booking options',
    'Punctual airport pickup with terminal meet & greet',
    'Transparent pricing with zero hidden return charges',
    'Multiple vehicle categories (Sedans, SUVs, Luxury cars)',
    'Specialized wedding convoy and corporate travel solutions',
  ];

  return (
    <section className="py-20 sm:py-24 fluid-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Left Visual */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-brand-border p-3 shadow-premium">
            <img
              src="/images/Confidence.jpg"
              alt="WhiteCabz Chauffeur Service & Trust"
              className="w-full h-[320px] sm:h-[420px] object-cover rounded-2xl"
              loading="lazy"
            />
            {/* Floating Glass Stats Badge */}
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-brand-border shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-gold-50 flex items-center justify-center text-brand-gold-dark border border-brand-gold-200">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">White Standard</h4>
                  <p className="text-xs text-slate-500">Strict hygiene & punctuality protocol</p>
                </div>
              </div>
              <span className="text-xs font-bold text-brand-gold-dark bg-brand-gold-50 px-2.5 py-1 rounded-full border border-brand-gold-200">Verified</span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-6">
          <div className="space-y-3">
            <Badge variant="gold">Why Choose WhiteCabz</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
              Travel With Confidence
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We focus on the elements that matter most to discerning travelers: absolute punctuality, pristine vehicle hygiene, respectful chauffeurs, and effortless coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Button onClick={() => onOpenBooking()} variant="gold" size="lg">
              Book Your Ride
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

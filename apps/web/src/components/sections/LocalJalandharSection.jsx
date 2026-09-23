import React from 'react';
import { MapPin, Check, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function LocalJalandharSection({ onOpenBooking }) {
  const packages = [
    {
      title: '4 Hours / 40 KM',
      badge: 'Quick City Errands',
      desc: 'Perfect for quick shopping trips, hospital appointments, or local meetings in Jalandhar.',
    },
    {
      title: '8 Hours / 80 KM',
      badge: 'Full Day Rental',
      desc: 'The complete city day package for family functions, shopping at Model Town, and multiple stops.',
    },
    {
      title: '12 Hours / 120 KM',
      badge: 'Extended Day',
      desc: 'Full-day freedom with private car and chauffeur for full sightseeing and nearby town visits.',
    },
    {
      title: 'Railway Station Transfer',
      badge: 'Jalandhar City & Cantt',
      desc: 'Punctual platform-aligned pickup and drops for Vande Bharat, Shatabdi, and express trains.',
    },
  ];

  return (
    <section className="py-20 sm:py-24 fluid-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Info */}
        <div className="lg:col-span-5 space-y-5">
          <Badge variant="gold">
            <MapPin className="w-3.5 h-3.5" /> Jalandhar Hub
          </Badge>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Your Local Cab Partner in Jalandhar
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Need a reliable cab for city shopping, doctor visits, railway transfers, or full-day family travel within Jalandhar? WhiteCabz provides clean, prompt, and private chauffeured cars.
          </p>

          <div className="space-y-2 pt-1 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Zero surge pricing or surprise cancellations</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Dedicated chauffeur stays with you throughout</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Jalandhar City & Jalandhar Cantt railway station coverage</span>
            </div>
          </div>

          <div className="pt-2">
            <Button
              onClick={() =>
                onOpenBooking({
                  pickup: 'Jalandhar City',
                  destination: 'Local Jalandhar',
                  tripType: 'Hourly Rental',
                })
              }
              variant="gold"
              size="lg"
            >
              Book Local Cab
            </Button>
          </div>
        </div>

        {/* Right Packages Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-brand-border hover:border-brand-gold/60 hover:shadow-card-hover transition-all flex flex-col justify-between group shadow-soft"
            >
              <div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-subtle text-slate-700 border border-brand-border">
                  {pkg.badge}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-3 mb-1.5 group-hover:text-brand-gold-dark transition-colors font-display">
                  {pkg.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {pkg.desc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-brand-border">
                <button
                  type="button"
                  onClick={() =>
                    onOpenBooking({
                      pickup: 'Jalandhar',
                      destination: 'Local City Rental',
                      tripType: 'Hourly Rental',
                    })
                  }
                  className="text-xs font-bold text-brand-gold-dark hover:underline flex items-center gap-1 min-h-[36px]"
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

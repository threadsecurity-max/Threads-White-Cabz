import React from 'react';
import { Plane, Clock, ShieldCheck, Luggage, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function AirportTransfersSection({ onOpenBooking }) {
  const airportRoutes = [
    { title: 'Jalandhar → Amritsar Airport (ATQ)', desc: 'Direct transfer to Sri Guru Ram Dass Jee International Airport.' },
    { title: 'Jalandhar → Delhi Airport (IGI T1/T2/T3)', desc: 'Nonstop highway transfer to IGI International & Domestic Terminals.' },
    { title: 'Jalandhar → Chandigarh Airport (IXC)', desc: 'Quick and punctual connection to Shaheed Bhagat Singh Airport.' },
    { title: 'Jalandhar → Adampur Airport (AIP)', desc: 'Convenient local Doaba airport transfer for domestic departures.' },
    { title: 'Jalandhar → Dehradun Airport (DED)', desc: 'Interstate airport transfer directly connecting Punjab to Jolly Grant Airport.' },
    { title: 'Amritsar Airport (ATQ) → Jalandhar', desc: 'Flight-tracked arrival pickup with terminal meet & greet.' },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#F5EFEB]/70 border-t border-brand-border">
      <div className="fluid-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-5">
            <Badge variant="gold">Punctual & Stress-Free</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
              Airport Transfers Without The Stress
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Never worry about missing a flight or waiting for a cab after landing. WhiteCabz coordinates with your flight timings for seamless terminal pickups and drops.
            </p>

            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <Clock className="w-5 h-5 text-brand-gold shrink-0" />
                <span><strong>Flight-Aware Tracking:</strong> Chauffeur adjusts to delays automatically.</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <Luggage className="w-5 h-5 text-brand-gold shrink-0" />
                <span><strong>Luggage-Friendly:</strong> Ample trunk capacity and roof carriers.</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
                <span><strong>24×7 Availability:</strong> Early morning 3 AM or midnight pickups.</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={() =>
                  onOpenBooking({
                    pickup: 'Jalandhar',
                    destination: 'Amritsar Airport (ATQ)',
                    tripType: 'Airport Transfer',
                  })
                }
                variant="gold"
                size="lg"
              >
                Book Airport Transfer
              </Button>
            </div>
          </div>

          {/* Right Airport Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {airportRoutes.map((rt, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-brand-border hover:border-brand-gold/60 hover:shadow-card-hover transition-all flex flex-col justify-between group shadow-soft"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-brand-gold-50 text-brand-gold-dark flex items-center justify-center mb-3 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                    <Plane className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-brand-gold-dark transition-colors font-display">
                    {rt.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {rt.desc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const [from, to] = rt.title.split('→').map((s) => s.trim());
                    onOpenBooking({
                      pickup: from,
                      destination: to,
                      tripType: 'Airport Transfer',
                    });
                  }}
                  className="pt-4 text-xs font-bold text-brand-gold-dark hover:underline flex items-center gap-1 min-h-[36px]"
                >
                  <span>Book This Transfer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

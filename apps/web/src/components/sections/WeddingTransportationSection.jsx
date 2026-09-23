import React from 'react';
import { Sparkles, Crown } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { getWhatsAppUrl } from '../../lib/whatsapp';

export function WeddingTransportationSection({ onOpenBooking }) {
  const weddingServices = [
    'Pristine White Luxury Bridal Cars',
    'Groom Baraat Convoy Vehicles',
    'VIP Guest & Dignitary Transport',
    'Multi-Car Fleet for Wedding Parties',
    'Fresh Flower Car Decoration Coordination',
    'Outstation Relative Airport Transfers',
  ];

  return (
    <section className="py-20 sm:py-24 fluid-container">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-white to-[#FAF5EB] border border-brand-gold/30 p-6 sm:p-10 lg:p-14 shadow-premium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Info */}
          <div className="space-y-5">
            <Badge variant="gold">
              <Sparkles className="w-3.5 h-3.5" /> Luxury Wedding Mobility
            </Badge>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
              Arrive In Style
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Complete luxury wedding transportation solutions for couples, families, and visiting guests. Make your celebrations grand, punctual, and memorable.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {weddingServices.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <Crown className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() =>
                  onOpenBooking({
                    tripType: 'Wedding',
                    vehiclePreference: 'Wedding Cars',
                  })
                }
                variant="gold"
                size="lg"
              >
                Plan Wedding Transportation
              </Button>

              <a
                href={getWhatsAppUrl('Hello WhiteCabz, I would like to request a custom wedding transportation package.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-slate-800 border border-brand-border hover:border-brand-gold/50 transition-colors text-sm font-semibold text-center min-h-[50px] shadow-xs"
              >
                Request Custom Package →
              </a>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-brand-gold/30 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Wedding Car"
                className="w-full h-72 sm:h-88 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-brand-gold-light font-bold">
                    White Glove Protocol
                  </span>
                  <h4 className="text-xl font-bold text-white mt-1">
                    Bespoke Bride & Groom Fleet
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

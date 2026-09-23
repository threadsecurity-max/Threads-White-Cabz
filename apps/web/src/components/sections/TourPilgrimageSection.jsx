import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function TourPilgrimageSection({ onOpenBooking }) {
  const tourCategories = [
    {
      title: 'Pilgrimage Taxi Service',
      desc: 'Respectful, comfortable travel for Golden Temple, Mata Vaishno Devi, Vrindavan, and Haridwar.',
      highlight: 'Darshan Aligned Schedules',
      destination: 'Golden Temple Amritsar',
    },
    {
      title: 'Himalayan Tourist Packages',
      desc: 'Mountain-specialist drivers for Manali, Solang Valley, Dharamshala, McLeodganj, and Shimla.',
      highlight: 'Hill Certified Chauffeurs',
      destination: 'Manali',
    },
    {
      title: 'Family Outstation Trips',
      desc: 'Spacious SUVs with roof-carriers for multi-day family vacations and reunions across India.',
      highlight: 'Comfortable Long Drives',
      destination: 'Dehradun',
    },
    {
      title: 'Group Transportation',
      desc: 'Multi-car fleet mobilization for large family groups, spiritual yatras, and tourist parties.',
      highlight: 'Fleet Convoy Coordination',
      destination: 'Haridwar',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#F5EFEB]/60 border-t border-brand-border">
      <div className="fluid-container">
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14">
          <Badge variant="gold">
            <Compass className="w-3.5 h-3.5" /> Tourism & Pilgrimage
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Travel Beyond The Destination
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Dedicated chauffeur packages tailored for sacred pilgrimage yatras, scenic hill retreats, and family holidays.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {tourCategories.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-brand-border hover:border-brand-gold/60 hover:shadow-card-hover transition-all flex flex-col justify-between group shadow-soft"
            >
              <div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-gold-50 text-brand-gold-dark border border-brand-gold-200">
                  {pkg.highlight}
                </span>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-4 mb-2 group-hover:text-brand-gold-dark transition-colors font-display">
                  {pkg.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                  {pkg.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border">
                <Button
                  onClick={() =>
                    onOpenBooking({
                      pickup: 'Jalandhar',
                      destination: pkg.destination,
                      tripType: 'Round Trip',
                    })
                  }
                  variant="gold"
                  size="sm"
                  className="w-full"
                >
                  <span>Book Tour Cab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

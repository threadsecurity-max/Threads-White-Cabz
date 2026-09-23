import React, { useState } from 'react';
import { Users, Briefcase, Wind, UserCheck, Check } from 'lucide-react';
import { FLEET_DATA } from '../../data/fleetData';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function FleetSection({ onOpenBooking }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Sedan', 'SUV', 'Premium Sedan', 'Luxury SUV', 'Wedding Cars'];

  const filteredFleet = selectedCategory === 'All'
    ? FLEET_DATA
    : FLEET_DATA.filter((v) => v.category === selectedCategory);

  return (
    <section className="py-20 sm:py-24 bg-[#FAF8F5]">
      <div className="fluid-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-12">
          <Badge variant="gold">Our Fleet</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Choose Your Ride
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Pristine sedans, spacious SUVs, and luxury vehicles tailored for intercity, family, and executive travel.
          </p>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-4 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[40px] ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-dark text-white shadow-gold-glow'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-brand-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFleet.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-3xl overflow-hidden border border-brand-border hover:border-brand-gold/60 hover:shadow-card-hover transition-all flex flex-col justify-between group shadow-soft"
            >
              <div>
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-brand-gold-dark border border-brand-gold-200 backdrop-blur-md shadow-sm">
                      {vehicle.category}
                    </span>
                  </div>
                  {vehicle.tag && (
                    <div className="absolute top-3.5 right-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-md">
                        {vehicle.tag}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-brand-gold-dark transition-colors font-display">
                      {vehicle.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {vehicle.description}
                    </p>
                  </div>

                  {/* Spec Strip */}
                  <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-brand-border text-xs text-slate-700 font-medium">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>{vehicle.passengers}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>{vehicle.luggage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>Climate AC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>Driver Included</span>
                    </div>
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-1.5 pt-1">
                    {vehicle.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <Button
                  onClick={() =>
                    onOpenBooking({
                      vehiclePreference: vehicle.category,
                    })
                  }
                  variant="gold"
                  size="md"
                  className="w-full"
                >
                  Book This Car
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

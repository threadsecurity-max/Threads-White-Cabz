import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DESTINATIONS_DATA } from '../../data/destinationsData';
import { Badge } from '../ui/Badge';

export function DestinationsSection() {
  return (
    <section className="py-20 sm:py-24 fluid-container">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14">
        <Badge variant="gold">Popular Destinations</Badge>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
          Where Can WhiteCabz Take You?
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          From bustling metros and religious shrines to Himalayan hill retreats across North India.
        </p>
      </div>

      {/* Destination Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {DESTINATIONS_DATA.map((dest, idx) => (
          <Link
            key={idx}
            to={`/routes/${dest.routeSlug}`}
            className="group relative rounded-3xl overflow-hidden bg-white border border-brand-border hover:border-brand-gold/60 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col h-64 sm:h-72 shadow-soft"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

            <div className="relative z-10 p-4 sm:p-5 mt-auto space-y-1 text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-gold-light">
                {dest.category}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-gold-light transition-colors font-display">
                {dest.name}
              </h4>
              <p className="text-[11px] text-slate-300 line-clamp-1">
                {dest.tagline}
              </p>
              <div className="pt-2 flex items-center text-[11px] font-bold text-brand-gold-light group-hover:translate-x-1 transition-transform">
                <span>Explore Services</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

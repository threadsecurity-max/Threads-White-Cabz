import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES_DATA } from '../../data/routesData';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function PopularRoutesSection({ onOpenBooking }) {
  // Take top 8 popular routes for homepage showcase
  const popularRoutes = ROUTES_DATA.slice(0, 8);

  return (
    <section className="py-20 sm:py-24 bg-[#F5EFEB]/60 border-y border-brand-border">
      <div className="fluid-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="gold">Intercity & Airport Routes</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
              Popular Cab Routes
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Chauffeur-driven highway travel with transparent one-way and round-trip booking options.
            </p>
          </div>

          <Link
            to="/routes"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-gold-dark hover:text-slate-900 transition-colors"
          >
            <span>View All 20+ Routes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Routes Grid with fluid auto-fit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {popularRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-brand-border hover:border-brand-gold/60 hover:shadow-card-hover transition-all flex flex-col justify-between group shadow-soft"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-brand-gold-50 text-brand-gold-dark border border-brand-gold-200">
                    {route.serviceType}
                  </span>
                  {route.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      {route.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-base font-bold text-slate-900 group-hover:text-brand-gold-dark transition-colors font-display">
                    <span>{route.origin}</span>
                    <ArrowRight className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{route.destination}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {route.shortDescription}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border flex items-center justify-between gap-2">
                <Link
                  to={`/routes/${route.slug}`}
                  className="text-xs font-bold text-slate-600 hover:text-brand-gold-dark transition-colors"
                >
                  View Details →
                </Link>

                <Button
                  onClick={() =>
                    onOpenBooking({
                      pickup: route.origin,
                      destination: route.destination,
                      tripType: route.serviceType.includes('One-Way') ? 'One Way' : 'Round Trip',
                    })
                  }
                  variant="gold"
                  size="sm"
                >
                  Book Cab
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

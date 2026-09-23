import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { ROUTES_DATA } from '../data/routesData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export function RoutesIndex({ onOpenBooking }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredRoutes = ROUTES_DATA.filter((r) => {
    const matchesSearch =
      r.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === 'All') return matchesSearch;
    if (selectedFilter === 'Airport') return matchesSearch && r.serviceType.includes('Airport');
    if (selectedFilter === 'Pilgrimage') return matchesSearch && (r.serviceType.includes('Pilgrimage') || r.badge === 'Pilgrimage');
    if (selectedFilter === 'Hill Station') return matchesSearch && (r.serviceType.includes('Hill Station') || r.badge === 'Hill Station');
    return matchesSearch;
  });

  return (
    <div className="pt-28 sm:pt-32 pb-24 fluid-container">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-12">
        <Badge variant="gold">All India & North India Routes</Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display">
          Popular Cab & Taxi Routes
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Chauffeur-driven highway journeys with doorstep pickup, transparent pricing, and zero return fare on one-way trips.
        </p>

        {/* Search Bar & Filters */}
        <div className="pt-4 flex flex-col md:flex-row items-stretch md:items-center gap-3 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by city, airport, or destination (e.g. Delhi, Amritsar)..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-brand-border rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-brand-gold min-h-[46px] shadow-xs"
            />
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap shrink-0">
            {['All', 'Airport', 'Pilgrimage', 'Hill Station'].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all min-h-[44px] cursor-pointer ${
                  selectedFilter === f
                    ? 'bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-dark text-white shadow-gold-glow'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-brand-border hover:bg-brand-subtle'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredRoutes.map((route) => (
          <div
            key={route.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-brand-border hover:border-brand-gold/60 hover:shadow-card-hover transition-all flex flex-col justify-between group shadow-soft"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-gold-50 text-brand-gold-dark border border-brand-gold-200">
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
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {route.shortDescription}
                </p>
              </div>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-1.5 py-3 border-t border-brand-border">
                {route.features.slice(0, 2).map((feat, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-brand-subtle text-slate-600 border border-brand-border font-medium">
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border flex items-center justify-between gap-3">
              <Link
                to={`/routes/${route.slug}`}
                className="text-xs font-bold text-slate-600 hover:text-brand-gold-dark transition-colors"
              >
                Route Details →
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
  );
}

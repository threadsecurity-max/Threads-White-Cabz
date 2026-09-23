import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA, SERVICE_CATEGORIES } from '../data/servicesData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ArrowRight, Globe, Navigation, MapPin, Plane, Briefcase, Clock, Compass, Crown } from 'lucide-react';

const iconMap = {
  Globe,
  Navigation,
  MapPin,
  Plane,
  ArrowRight,
  Briefcase,
  Clock,
  Compass,
  Crown,
};

export function ServicesIndex({ onOpenBooking }) {
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredServices = selectedCat === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category.toLowerCase() === selectedCat.toLowerCase());

  return (
    <div className="pt-28 sm:pt-32 pb-24 fluid-container">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-12">
        <Badge variant="gold">Service Directory</Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display">
          Our Taxi & Car Rental Services
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Professional transportation organized into clear specialized categories for outstation, airport transfers, corporate travel, wedding luxury cars, and local city travel.
        </p>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-4 flex-wrap">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[40px] ${
                selectedCat === cat.id
                  ? 'bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-dark text-white shadow-gold-glow'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-brand-border'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredServices.map((service) => {
          const Icon = iconMap[service.icon] || Navigation;
          return (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border hover:border-brand-gold/60 hover:shadow-card-hover transition-all flex flex-col justify-between group shadow-soft"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold-50 border border-brand-gold-200 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-colors text-brand-gold-dark shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-brand-subtle text-slate-600 border border-brand-border font-medium">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 group-hover:text-brand-gold-dark transition-colors font-display">
                  {service.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {service.description}
                </p>

                <div className="space-y-2 py-4 border-t border-brand-border">
                  {service.benefits.map((b, i) => (
                    <div key={i} className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-brand-border flex items-center justify-between gap-3">
                <Link
                  to={`/services/${service.slug}`}
                  className="text-xs font-bold text-brand-gold-dark hover:underline flex items-center gap-1"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Button
                  onClick={() =>
                    onOpenBooking({
                      tripType: service.category === 'Airport' ? 'Airport Transfer' : service.category === 'Wedding' ? 'Wedding' : 'One Way',
                    })
                  }
                  variant="gold"
                  size="sm"
                >
                  Book Service
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

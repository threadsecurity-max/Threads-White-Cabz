import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Navigation, MapPin, Plane, ArrowRight, Briefcase, Clock, Compass } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { Badge } from '../ui/Badge';

const iconMap = {
  Globe,
  Navigation,
  MapPin,
  Plane,
  ArrowRight,
  Briefcase,
  Clock,
  Compass,
};

export function ServicesSection() {
  return (
    <section className="py-20 sm:py-24 fluid-container">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14">
        <Badge variant="gold">Comprehensive Transportation</Badge>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
          Everything You Need to Travel Comfortably
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          From everyday city rides to long-distance journeys, airport transfers, corporate travel, and wedding transportation.
        </p>
      </div>

      {/* Services Grid with auto-fit fluid sizing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {SERVICES_DATA.map((service) => {
          const Icon = iconMap[service.icon] || Navigation;
          return (
            <Link
              key={service.id}
              to={`/services/${service.slug}`}
              className="group relative bg-white rounded-3xl p-6 border border-brand-border hover:border-brand-gold/60 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-soft"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold-50 border border-brand-gold-200 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-colors text-brand-gold-dark shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-bold">
                    {service.id}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-gold-dark transition-colors font-display">
                  {service.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {service.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border flex items-center text-xs font-bold text-brand-gold-dark group-hover:translate-x-1 transition-transform">
                <span>Explore Service</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

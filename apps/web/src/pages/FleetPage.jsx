import React from 'react';
import { FleetSection } from '../components/sections/FleetSection';
import { Badge } from '../components/ui/Badge';

export function FleetPage({ onOpenBooking }) {
  return (
    <div className="pt-28 sm:pt-32 pb-24">
      <div className="fluid-container mb-6 text-center space-y-3.5">
        <Badge variant="gold">Premium Chauffeured Vehicles</Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 font-display">
          The WhiteCabz Fleet
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
          Every vehicle in our fleet is verified for mechanical excellence, equipped with modern safety features, and maintained in pristine aesthetic condition.
        </p>
      </div>

      <FleetSection onOpenBooking={onOpenBooking} />
    </div>
  );
}

import React from 'react';
import { Hero } from '../components/sections/Hero';
import { TrustStrip } from '../components/sections/TrustStrip';
import { ServicesSection } from '../components/sections/ServicesSection';
import { PopularRoutesSection } from '../components/sections/PopularRoutesSection';
import { WhyWhiteCabzSection } from '../components/sections/WhyWhiteCabzSection';
import { FleetSection } from '../components/sections/FleetSection';
import { AirportTransfersSection } from '../components/sections/AirportTransfersSection';
import { WeddingTransportationSection } from '../components/sections/WeddingTransportationSection';
import { CorporateTravelSection } from '../components/sections/CorporateTravelSection';
import { DestinationsSection } from '../components/sections/DestinationsSection';
import { TourPilgrimageSection } from '../components/sections/TourPilgrimageSection';
import { LocalJalandharSection } from '../components/sections/LocalJalandharSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { ReviewsSection } from '../components/sections/ReviewsSection';
import { FAQSection } from '../components/sections/FAQSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';

export function Home({ onOpenBooking }) {
  return (
    <main>
      {/* 02 — HERO + 3D VEHICLE + BOOKING WIDGET */}
      <Hero onOpenBooking={onOpenBooking} />

      {/* 03 — TRUST STRIP */}
      <TrustStrip />

      {/* 04 — SERVICES */}
      <ServicesSection />

      {/* 05 — POPULAR ROUTES */}
      <PopularRoutesSection onOpenBooking={onOpenBooking} />

      {/* 06 — WHY WHITECABZ */}
      <WhyWhiteCabzSection onOpenBooking={onOpenBooking} />

      {/* 07 — FLEET */}
      <FleetSection onOpenBooking={onOpenBooking} />

      {/* 08 — AIRPORT TRANSFERS */}
      <AirportTransfersSection onOpenBooking={onOpenBooking} />

      {/* 09 — WEDDING TRANSPORTATION */}
      <WeddingTransportationSection onOpenBooking={onOpenBooking} />

      {/* 10 — CORPORATE TRAVEL */}
      <CorporateTravelSection onOpenBooking={onOpenBooking} />

      {/* 11 — DESTINATIONS */}
      <DestinationsSection />

      {/* 12 — TOUR / PILGRIMAGE */}
      <TourPilgrimageSection onOpenBooking={onOpenBooking} />

      {/* 13 — LOCAL JALANDHAR */}
      <LocalJalandharSection onOpenBooking={onOpenBooking} />

      {/* 14 — HOW IT WORKS */}
      <HowItWorksSection />

      {/* 15 — REVIEWS */}
      <ReviewsSection />

      {/* 16 — FAQ */}
      <FAQSection />

      {/* 17 — FINAL BOOKING CTA */}
      <FinalCTASection onOpenBooking={onOpenBooking} />
    </main>
  );
}

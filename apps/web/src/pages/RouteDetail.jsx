import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUTES_DATA } from '../data/routesData';
import { BookingWidget } from '../components/booking/BookingWidget';
import { FLEET_DATA } from '../data/fleetData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Accordion } from '../components/ui/Accordion';
import { Clock, ShieldCheck, CheckCircle2, Phone, MessageSquare, Car } from 'lucide-react';
import { getWhatsAppUrl, getCallUrl, DISPLAY_PHONE } from '../lib/whatsapp';

export function RouteDetail({ onOpenBooking }) {
  const { slug } = useParams();
  const route = ROUTES_DATA.find((r) => r.slug.toLowerCase() === slug?.toLowerCase());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!route) {
    return (
      <div className="pt-40 pb-24 text-center max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">Route Not Found</h2>
        <p className="text-slate-600 mb-6">The requested route page could not be located.</p>
        <Link to="/routes" className="px-6 py-3 rounded-2xl bg-brand-gold text-white font-bold">
          Browse All Routes
        </Link>
      </div>
    );
  }

  const defaultRouteFaqs = [
    {
      question: `How do I book a cab from ${route.origin} to ${route.destination}?`,
      answer: `You can submit your travel date and details using our booking form above, or click "WhatsApp Us" for instant coordination with our operations team.`
    },
    {
      question: `Do I have to pay return fare for a one-way trip?`,
      answer: `No. WhiteCabz provides dedicated one-way cab services between ${route.origin} and ${route.destination}. You pay only for the one-way ride.`
    },
    {
      question: `Are toll taxes and state permits included?`,
      answer: `Our coordinator provides clear, transparent quotes outlining state tax, toll plazas, and parking rules so there are zero surprise charges during your journey.`
    },
    {
      question: `Can the chauffeur stop for meals and restrooms on the highway?`,
      answer: `Yes, absolutely. Our courteous chauffeurs are happy to pause at verified family restaurants, dhabas, and hygienic highway amenities.`
    }
  ];

  const allFaqs = route.faqs && route.faqs.length > 0 ? [...route.faqs, ...defaultRouteFaqs] : defaultRouteFaqs;

  return (
    <div className="pt-28 sm:pt-32 pb-24">
      <div className="fluid-container space-y-12 sm:space-y-16">
        {/* Route Hero */}
        <div className="space-y-3.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <Badge variant="gold">{route.serviceType}</Badge>
            {route.badge && <Badge variant="silver">{route.badge}</Badge>}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 font-display">
            {route.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {route.heroText || route.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 pt-1">
            <span className="flex items-center gap-1.5 font-medium"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Chauffeur</span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium"><Car className="w-4 h-4 text-brand-gold" /> Clean Sanitized Fleet</span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium"><Clock className="w-4 h-4 text-brand-gold" /> 24x7 Doorstep Pickup</span>
          </div>
        </div>

        {/* Floating Pre-filled Booking Widget */}
        <BookingWidget
          onOpenBooking={onOpenBooking}
          defaultValues={{
            pickup: route.origin,
            destination: route.destination,
            tripType: route.serviceType.includes('One-Way') ? 'One Way' : 'Round Trip',
          }}
        />

        {/* Route Information & Travel Considerations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                About the {route.origin} to {route.destination} Journey
              </h3>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {route.description}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark">
                  Key Route Advantages
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {route.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Available Services for this Route */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                Available Booking Options
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-slate-700">
                <div className="p-4 rounded-2xl bg-brand-subtle border border-brand-border space-y-1">
                  <span className="font-bold text-slate-900 block">One-Way Drop</span>
                  <p className="text-slate-500 text-xs">Point to point direct transfer with no return charges.</p>
                </div>
                <div className="p-4 rounded-2xl bg-brand-subtle border border-brand-border space-y-1">
                  <span className="font-bold text-slate-900 block">Round-Trip / Same Day Return</span>
                  <p className="text-slate-500 text-xs">Car stays with you for shopping, meetings, and return journey.</p>
                </div>
                <div className="p-4 rounded-2xl bg-brand-subtle border border-brand-border space-y-1">
                  <span className="font-bold text-slate-900 block">Airport Transfer</span>
                  <p className="text-slate-500 text-xs">Punctual terminal-gate drop with flight tracking.</p>
                </div>
                <div className="p-4 rounded-2xl bg-brand-subtle border border-brand-border space-y-1">
                  <span className="font-bold text-slate-900 block">Family & Corporate Tour</span>
                  <p className="text-slate-500 text-xs">Spacious SUVs with customized sightseeing stops.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Fleet Recommendation & Direct Help */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl p-6 border border-brand-gold/30 shadow-premium space-y-5">
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Recommended Fleet for this Route
              </h3>

              <div className="space-y-3">
                {FLEET_DATA.slice(0, 3).map((v) => (
                  <div key={v.id} className="p-3.5 rounded-2xl bg-brand-subtle border border-brand-border flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{v.title}</span>
                      <span className="text-[11px] text-slate-500">{v.passengers} • {v.luggage}</span>
                    </div>
                    <Button
                      onClick={() =>
                        onOpenBooking({
                          pickup: route.origin,
                          destination: route.destination,
                          vehiclePreference: v.category,
                        })
                      }
                      variant="gold"
                      size="sm"
                    >
                      Select
                    </Button>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-brand-border flex flex-col gap-2.5">
                <a
                  href={getWhatsAppUrl({
                    pickup: route.origin,
                    destination: route.destination,
                    tripType: 'One Way',
                  })}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20BA5A] transition-colors text-xs flex items-center justify-center gap-2 shadow-md text-center min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire {route.origin} → {route.destination} on WhatsApp</span>
                </a>

                <a
                  href={getCallUrl()}
                  className="w-full py-3 px-4 rounded-xl bg-white text-slate-800 border border-brand-border hover:border-brand-gold/60 transition-colors text-xs font-semibold flex items-center justify-center gap-2 text-center min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-brand-gold" />
                  <span>Call WhiteCabz ({DISPLAY_PHONE})</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Route FAQs */}
        <div className="space-y-5 max-w-4xl mx-auto pt-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Frequently Asked Questions — {route.origin} to {route.destination}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Clear information for your planned travel between {route.origin} and {route.destination}.
            </p>
          </div>
          <Accordion items={allFaqs} />
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-white via-[#FDFBF8] to-[#F7F2E6] rounded-3xl p-8 text-center border border-brand-gold/30 shadow-premium space-y-3.5">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Book {route.origin} to {route.destination} Cab
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Get prompt coordination and verified drivers for your journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-1">
            <Button
              onClick={() =>
                onOpenBooking({
                  pickup: route.origin,
                  destination: route.destination,
                })
              }
              variant="gold"
              size="lg"
            >
              Request Booking Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

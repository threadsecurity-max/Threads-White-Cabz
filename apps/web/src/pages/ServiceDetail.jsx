import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/servicesData';
import { BookingWidget } from '../components/booking/BookingWidget';
import { Badge } from '../components/ui/Badge';
import { CheckCircle2, Sparkles, MessageSquare, Phone } from 'lucide-react';
import { getWhatsAppUrl, getCallUrl, DISPLAY_PHONE } from '../lib/whatsapp';

export function ServiceDetail({ onOpenBooking }) {
  const { slug } = useParams();
  const service = SERVICES_DATA.find((s) => s.slug.toLowerCase() === slug?.toLowerCase());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="pt-40 pb-24 text-center max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">Service Not Found</h2>
        <p className="text-slate-600 mb-6">The requested service page could not be found.</p>
        <Link to="/services" className="px-6 py-3 rounded-2xl bg-brand-gold text-white font-bold">
          Browse All Services
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 sm:pt-32 pb-24">
      <div className="fluid-container space-y-12 sm:space-y-16">
        {/* Service Hero */}
        <div className="space-y-3.5 max-w-3xl">
          <Badge variant="gold">{service.category}</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 font-display">
            {service.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            {service.tagline}
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Booking Form Integration */}
        <BookingWidget
          onOpenBooking={onOpenBooking}
          defaultValues={{
            tripType: service.category === 'Airport' ? 'Airport Transfer' : service.category === 'Wedding' ? 'Wedding' : 'One Way',
          }}
        />

        {/* Benefits & Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                Service Standards & Guarantees
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Every {service.name.toLowerCase()} is conducted in accordance with WhiteCabz premium safety and hygiene protocols. We guarantee verified highway chauffeurs, on-time arrivals, and upfront clear communication.
              </p>

              <div className="space-y-3 pt-2">
                {service.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Direct Action Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-gold/30 shadow-premium space-y-5">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-brand-gold" />
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Instant Support for {service.name}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Have custom itinerary requirements or multi-car needs? Our fleet coordinator is available 24×7.
              </p>

              <div className="flex flex-col gap-2.5 pt-1">
                <a
                  href={getWhatsAppUrl(`Hello WhiteCabz, I would like to book / enquire about ${service.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20BA5A] transition-colors text-sm flex items-center justify-center gap-2 shadow-md text-center min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <a
                  href={getCallUrl()}
                  className="w-full py-3.5 px-4 rounded-xl bg-white text-slate-800 border border-brand-border hover:border-brand-gold/60 transition-colors text-sm font-semibold flex items-center justify-center gap-2 text-center min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-brand-gold" />
                  <span>Call {DISPLAY_PHONE}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function ReviewsSection() {
  const reviews = [
    {
      name: 'Gurpreet S.',
      rating: 5,
      route: 'Jalandhar → Delhi Airport (IGI)',
      service: 'Airport Transfer',
      date: 'Verified Ride',
      text: 'Booked an airport drop at 2:30 AM for an international flight. The driver arrived 15 minutes before time in a spotless sedan. Very polite and smooth driving throughout NH44.',
    },
    {
      name: 'Rohit Verma',
      rating: 5,
      route: 'Jalandhar → Chandigarh',
      service: 'Corporate Travel',
      date: 'Verified Ride',
      text: 'Our corporate delegates regularly travel between Jalandhar and Mohali. WhiteCabz always delivers executive cars with clean interiors and proper GST billing.',
    },
    {
      name: 'Simran Kaur',
      rating: 5,
      route: 'Jalandhar → Amritsar Golden Temple',
      service: 'Pilgrimage Darshan',
      date: 'Verified Ride',
      text: 'Travelled with elderly parents for Golden Temple darshan. The driver was extremely respectful, assisted with walking, and waited patiently at the parking bay.',
    },
  ];

  return (
    <section className="py-20 sm:py-24 fluid-container">
      <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14">
        <Badge variant="gold">Customer Feedback</Badge>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
          Trusted By Travelers
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Real feedback from travelers across Punjab, Delhi NCR, airports, and outstation routes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border hover:border-brand-gold/60 hover:shadow-card-hover transition-all flex flex-col justify-between space-y-6 shadow-soft relative"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-brand-gold">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold" />
                  ))}
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {rev.date}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                "{rev.text}"
              </p>
            </div>

            <div className="pt-4 border-t border-brand-border flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-display">
                  {rev.name}
                </h4>
                <p className="text-xs font-semibold text-brand-gold-dark mt-0.5">
                  {rev.route}
                </p>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-brand-subtle text-slate-600 border border-brand-border font-medium">
                {rev.service}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

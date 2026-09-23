import React from 'react';
import { MapPin, Car, CheckCircle2, Navigation } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      icon: MapPin,
      title: 'Choose Your Route',
      desc: 'Tell us where you are starting and your destination, along with travel date and pickup time.',
    },
    {
      num: '02',
      icon: Car,
      title: 'Select Your Ride',
      desc: 'Choose a sedan, spacious family SUV, or premium executive car tailored for your luggage and group.',
    },
    {
      num: '03',
      icon: CheckCircle2,
      title: 'Confirm Your Booking',
      desc: 'Submit your request or connect via WhatsApp. Our coordinator verifies availability and sends your Booking ID.',
    },
    {
      num: '04',
      icon: Navigation,
      title: 'Enjoy The Journey',
      desc: 'Your professional chauffeur arrives on time. Sit back, relax, and travel in clean, air-conditioned comfort.',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#F5EFEB]/60 border-y border-brand-border">
      <div className="fluid-container">
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14">
          <Badge variant="gold">Simple 4-Step Process</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Booking a dependable cab with WhiteCabz is seamless, transparent, and takes less than a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-brand-border hover:border-brand-gold/60 hover:shadow-card-hover transition-all space-y-4 relative group shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold-50 border border-brand-gold-200 flex items-center justify-center text-brand-gold-dark group-hover:bg-brand-gold group-hover:text-white transition-colors shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-extrabold text-brand-gold/30 font-display">
                    {step.num}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-gold-dark transition-colors font-display">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

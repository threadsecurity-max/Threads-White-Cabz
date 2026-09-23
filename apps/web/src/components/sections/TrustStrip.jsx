import React from 'react';
import { Clock, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export function TrustStrip() {
  const items = [
    {
      icon: Clock,
      title: '24×7 Active Dispatch',
      desc: 'Instant booking & on-demand cabs day or night.',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Chauffeurs',
      desc: 'Courteous, experienced highway professionals.',
    },
    {
      icon: Sparkles,
      title: 'Sanitized Fleet',
      desc: 'Pristine AC sedans, SUVs & luxury vehicles.',
    },
    {
      icon: CheckCircle2,
      title: 'Transparent Pricing',
      desc: 'All-inclusive fares with zero hidden surcharges.',
    },
  ];

  return (
    <section className="relative z-10 py-4 sm:py-6">
      <div className="fluid-container">
        <div className="bg-white rounded-3xl p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 shadow-soft border border-brand-border/80 divide-y sm:divide-y-0 sm:divide-x divide-brand-border/60">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={`flex items-center gap-3.5 ${idx !== 0 ? 'sm:pl-6 pt-4 sm:pt-0' : ''}`}>
                <div className="w-11 h-11 rounded-2xl bg-brand-gold-50 border border-brand-gold-200 flex items-center justify-center shrink-0 text-brand-gold-dark shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-slate-900 font-display">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-snug">
                    {item.desc}
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

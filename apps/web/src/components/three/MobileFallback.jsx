import React from 'react';
import { Sparkles } from 'lucide-react';

export function MobileFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
      {/* Background Subtle Warm Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,147,68,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Luxury Vehicle Presentation Graphic */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-sm">
        <div className="relative w-full rounded-3xl overflow-hidden bg-white border border-brand-border p-3 shadow-premium">
          <img
            src="/images/Dzire.jpg"
            alt="WhiteCabz Premium Fleet"
            className="w-full h-44 sm:h-52 object-cover rounded-2xl"
            loading="lazy"
          />

          <div className="mt-3.5 flex items-center justify-between text-left px-1">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Premium White Fleet
              </span>
              <h4 className="text-sm font-bold text-slate-900">Chauffeured Mobility</h4>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-brand-subtle text-[10px] font-bold text-slate-700 border border-brand-border">
              Jalandhar Hub
            </div>
          </div>
        </div>

        {/* Route tags */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 max-w-sm">
          {['Delhi NCR', 'Chandigarh', 'Amritsar Airport', 'Manali', 'Jammu'].map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white text-slate-700 border border-brand-border shadow-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

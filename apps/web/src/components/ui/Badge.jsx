import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ children, variant = 'gold', className }) {
  const variants = {
    gold: 'bg-brand-gold/10 text-brand-gold-dark border-brand-gold/30',
    silver: 'bg-slate-100 text-slate-700 border-slate-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dark: 'bg-slate-900 text-white border-slate-800',
    champagne: 'bg-brand-gold-50 text-brand-gold-dark border-brand-gold-200',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide border uppercase',
      variants[variant] || variants.gold,
      className
    )}>
      {children}
    </span>
  );
}

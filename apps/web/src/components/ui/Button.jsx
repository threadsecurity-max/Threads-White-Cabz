import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}, ref) => {
  const variants = {
    primary: 'bg-brand-dark text-white hover:bg-slate-800 font-semibold shadow-md active:scale-[0.98]',
    gold: 'bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-dark text-white font-bold shadow-gold-glow hover:brightness-105 active:scale-[0.98]',
    outline: 'bg-white border border-brand-border text-slate-800 hover:bg-brand-subtle hover:border-brand-gold/50 active:scale-[0.98]',
    glass: 'glass-panel text-slate-800 hover:border-brand-gold/60 active:scale-[0.98]',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#20BA5A] font-semibold shadow-md active:scale-[0.98]',
    phone: 'bg-white border border-brand-border text-slate-800 hover:border-brand-gold/60 hover:text-brand-gold-dark active:scale-[0.98]',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-black/5',
  };

  const sizes = {
    sm: 'px-3.5 py-2 text-xs rounded-xl gap-1.5 min-h-[38px]',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2 min-h-[44px]',
    lg: 'px-7 py-3.5 text-base rounded-2xl gap-2.5 min-h-[50px]',
    xl: 'px-8 py-4 text-lg rounded-2xl gap-3 min-h-[56px]',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

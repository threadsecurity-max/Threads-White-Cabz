import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, Menu, X, Car, Shield, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { getWhatsAppUrl, getCallUrl, DISPLAY_PHONE } from '../../lib/whatsapp';

export function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'Taxi Services',
      path: '/services',
      hasDropdown: true,
      subItems: [
        { name: 'Outstation Trips', path: '/services/outstation-trips' },
        { name: 'Airport Pickup & Drop', path: '/services/airport-pickup' },
        { name: 'One Way Taxi', path: '/services/one-way-taxi' },
        { name: 'Corporate Travel', path: '/services/corporate-travel' },
        { name: 'Wedding Cars', path: '/services/wedding-transportation' },
        { name: 'Hourly Rentals & Local', path: '/services/hourly-rentals' },
        { name: 'Tour Packages', path: '/services/tour-packages' },
      ],
    },
    { name: 'Routes', path: '/routes' },
    { name: 'Airport', path: '/services/airport-pickup' },
    { name: 'Wedding Cars', path: '/services/wedding-transportation' },
    { name: 'Corporate', path: '/services/corporate-travel' },
    { name: 'Fleet', path: '/fleet' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pt-[env(safe-area-inset-top)] ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md py-3 border-b border-brand-border shadow-sm'
            : 'bg-gradient-to-b from-white/95 via-white/80 to-transparent py-4'
        }`}
      >
        <div className="fluid-container flex items-center justify-between">
          {/* Logo with Logo (2).png */}
          <Link to="/" className="flex items-center gap-2.5 group py-0.5">
            <img
              src="/images/Logo (2).png"
              alt="WhiteCabz Premium Cabs"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-xs"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-slate-700">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative group py-2"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className="px-3 py-2 rounded-xl hover:text-brand-gold-dark hover:bg-brand-subtle transition-colors flex items-center gap-1"
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
                    </Link>

                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-64 glass-dropdown rounded-2xl p-2 shadow-2xl border border-brand-border flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {link.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-brand-gold-dark hover:bg-brand-subtle rounded-xl transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl transition-colors ${
                    isActive
                      ? 'text-brand-gold-dark font-bold bg-brand-gold/10'
                      : 'hover:text-brand-gold-dark hover:bg-brand-subtle'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={getCallUrl()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 border border-brand-border bg-white hover:border-brand-gold/60 hover:text-brand-gold-dark transition-all shadow-sm"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>Call Now</span>
            </a>

            <Button
              onClick={() => onOpenBooking()}
              variant="gold"
              size="md"
              className="shadow-gold-glow"
            >
              Book a Cab
            </Button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href={getWhatsAppUrl('Hello WhiteCabz, I would like to book a cab.')}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 flex items-center justify-center hover:bg-[#25D366]/25 transition-colors"
              aria-label="WhatsApp Us"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <a
              href={getCallUrl()}
              className="w-10 h-10 rounded-xl bg-white text-slate-800 border border-brand-border flex items-center justify-center hover:bg-brand-subtle transition-colors shadow-sm"
              aria-label="Call WhiteCabz"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl bg-white text-slate-800 border border-brand-border flex items-center justify-center hover:bg-brand-subtle transition-colors shadow-sm"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[68px] z-30 bg-white/98 backdrop-blur-xl border-t border-brand-border overflow-y-auto p-6 flex flex-col justify-between xl:hidden">
          <div className="flex flex-col gap-1 divide-y divide-brand-border/60">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="py-3.5 px-2 text-base font-semibold text-slate-800 hover:text-brand-gold-dark transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-slate-400">→</span>
              </Link>
            ))}

            <Link
              to="/track"
              className="py-3.5 px-2 text-sm font-bold text-brand-gold-dark flex items-center gap-2 mt-2"
            >
              <Shield className="w-4 h-4" />
              <span>Track Booking / Status</span>
            </Link>
          </div>

          <div className="pt-6 pb-[calc(1rem+env(safe-area-inset-bottom))] flex flex-col gap-3">
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              variant="gold"
              size="lg"
              className="w-full"
            >
              Book a Cab Now
            </Button>
            <div className="text-center text-xs text-slate-500">
              24×7 Assistance: <span className="text-slate-800 font-bold">{DISPLAY_PHONE}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, MessageSquare, Shield, Clock } from 'lucide-react';
import { getWhatsAppUrl, getCallUrl, DISPLAY_PHONE, DISPLAY_EMAIL } from '../../lib/whatsapp';

export function Footer() {
  return (
    <footer className="bg-[#F4EFE6] text-slate-600 pt-16 pb-28 sm:pb-16 border-t border-brand-border">
      <div className="fluid-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-border/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/images/Logo (2).png"
                alt="WhiteCabz Premium Mobility"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain drop-shadow-xs"
              />
            </Link>

            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Premium cab and taxi services headquartered in Jalandhar, connecting travelers to Delhi, Chandigarh, Amritsar, airports, hill stations, and pan-India destinations with dependable chauffeurs.
            </p>

            <div className="pt-2 flex flex-col gap-2.5 text-sm">
              <a href={getCallUrl()} className="flex items-center gap-2.5 text-slate-700 hover:text-brand-gold-dark font-medium transition-colors">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{DISPLAY_PHONE} (24x7 Helpline)</span>
              </a>
              <a href={getWhatsAppUrl('Hello WhiteCabz, I would like to book a cab with your service.')} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-slate-700 hover:text-[#20BA5A] font-medium transition-colors">
                <MessageSquare className="w-4 h-4 text-[#20BA5A] shrink-0" />
                <span>WhatsApp Booking & Support</span>
              </a>
              <div className="flex items-center gap-2.5 text-slate-600">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{DISPLAY_EMAIL}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Jalandhar, Punjab, India</span>
              </div>
            </div>
          </div>

          {/* Services Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-display">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services/outstation-trips" className="hover:text-brand-gold-dark transition-colors">Outstation Taxi</Link></li>
              <li><Link to="/services/one-way-taxi" className="hover:text-brand-gold-dark transition-colors">One-Way Taxi</Link></li>
              <li><Link to="/services/airport-pickup" className="hover:text-brand-gold-dark transition-colors">Airport Transfers</Link></li>
              <li><Link to="/services/corporate-travel" className="hover:text-brand-gold-dark transition-colors">Corporate Travel</Link></li>
              <li><Link to="/services/wedding-transportation" className="hover:text-brand-gold-dark transition-colors">Wedding Cars</Link></li>
              <li><Link to="/services/hourly-rentals" className="hover:text-brand-gold-dark transition-colors">Hourly & Local Cab</Link></li>
              <li><Link to="/services/tour-packages" className="hover:text-brand-gold-dark transition-colors">Tour Packages</Link></li>
            </ul>
          </div>

          {/* Popular Routes Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-display">Popular Routes</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/routes/jalandhar-to-delhi" className="hover:text-brand-gold-dark transition-colors">Jalandhar → Delhi</Link></li>
              <li><Link to="/routes/delhi-to-jalandhar" className="hover:text-brand-gold-dark transition-colors">Delhi → Jalandhar</Link></li>
              <li><Link to="/routes/jalandhar-to-chandigarh" className="hover:text-brand-gold-dark transition-colors">Jalandhar → Chandigarh</Link></li>
              <li><Link to="/routes/jalandhar-to-amritsar" className="hover:text-brand-gold-dark transition-colors">Jalandhar → Amritsar</Link></li>
              <li><Link to="/routes/jalandhar-to-amritsar-airport" className="hover:text-brand-gold-dark transition-colors">Jalandhar → Amritsar Airport</Link></li>
              <li><Link to="/routes/jalandhar-to-delhi-airport" className="hover:text-brand-gold-dark transition-colors">Jalandhar → Delhi Airport</Link></li>
              <li><Link to="/routes/jalandhar-to-manali" className="hover:text-brand-gold-dark transition-colors">Jalandhar → Manali</Link></li>
              <li><Link to="/routes" className="text-brand-gold-dark hover:underline font-bold">View All 20+ Routes →</Link></li>
            </ul>
          </div>

          {/* Company & Tracking Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-display">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-brand-gold-dark transition-colors">About WhiteCabz</Link></li>
              <li><Link to="/fleet" className="hover:text-brand-gold-dark transition-colors">Our Fleet</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold-dark transition-colors">Contact Support</Link></li>
              <li><Link to="/track" className="hover:text-brand-gold-dark transition-colors flex items-center gap-1.5 text-brand-gold-dark font-semibold"><Shield className="w-3.5 h-3.5" /> Track Booking</Link></li>
            </ul>

            <div className="pt-3">
              <div className="p-3 rounded-2xl bg-white border border-brand-border text-xs text-slate-700 flex items-center gap-2.5 shadow-sm">
                <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                <span>24x7 Human-in-the-loop Dispatch Desk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} WhiteCabz. All rights reserved. Premium North India Chauffeur Mobility.</p>
          <div className="flex items-center gap-4 font-medium">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Safety Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

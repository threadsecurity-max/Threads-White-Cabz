import React from 'react';
import { Briefcase, Building2, FileText, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { getWhatsAppUrl } from '../../lib/whatsapp';

export function CorporateTravelSection({ onOpenBooking }) {
  const corporateServices = [
    { title: 'Executive Car Service', desc: 'Discreet, well-groomed chauffeurs for VIP clients and executives.' },
    { title: 'Corporate Commutes', desc: 'Reliable and scheduled daily commutes for senior employees and teams.' },
    { title: 'Hotel & Airport Transfers', desc: 'Seamless pick and drop for visiting delegates and board members.' },
    { title: 'Monthly Fleet Rentals', desc: 'Dedicated vehicles and chauffeurs on flexible monthly contracts.' },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#F5EFEB]/60 border-t border-brand-border">
      <div className="fluid-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Visual & Badge */}
          <div className="lg:col-span-5 space-y-5">
            <Badge variant="gold">
              <Briefcase className="w-3.5 h-3.5" /> B2B Mobility
            </Badge>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
              Corporate Travel, Simplified.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              WhiteCabz is the dependable partner for corporate enterprises across Punjab and NCR. We offer consolidated GST billing, executive sedans, and priority coordinator support.
            </p>

            <div className="p-4 rounded-2xl bg-white border border-brand-border space-y-1.5 text-xs sm:text-sm text-slate-700 shadow-xs">
              <div className="flex items-center gap-2 text-brand-gold-dark font-bold">
                <FileText className="w-4 h-4 text-brand-gold" /> Consolidated GST Invoicing & Credit Terms
              </div>
              <p className="text-slate-500 text-xs">
                Streamline accounting with monthly tax invoices and detailed travel logs.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppUrl('Hello WhiteCabz Corporate Team, I would like to discuss corporate transportation requirements.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-dark text-white font-bold hover:brightness-105 transition-all text-sm shadow-gold-glow min-h-[50px]"
              >
                <span>Talk to Corporate Travel Team</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Service Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {corporateServices.map((srv, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-brand-border hover:border-brand-gold/60 hover:shadow-card-hover transition-all space-y-2.5 shadow-soft"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold-50 border border-brand-gold-200 flex items-center justify-center text-brand-gold-dark">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-display">{srv.title}</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

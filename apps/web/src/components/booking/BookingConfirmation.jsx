import React from 'react';
import { CheckCircle2, MessageSquare, Phone, Calendar, Clock, MapPin, Navigation, Car, ShieldCheck } from 'lucide-react';
import { getWhatsAppUrl, getCallUrl, DISPLAY_PHONE } from '../../lib/whatsapp';

export function BookingConfirmation({ booking, onClose }) {
  const whatsappUrl = booking.whatsappLink || getWhatsAppUrl(booking);

  return (
    <div className="text-left space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
        <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-base sm:text-lg font-bold text-emerald-950">Your booking request has been received.</h4>
          <p className="text-xs sm:text-sm text-emerald-800 mt-1">
            Our dedicated WhiteCabz coordinator will contact you shortly to confirm vehicle assignment and finalized fare.
          </p>
        </div>
      </div>

      {/* Booking Summary Box */}
      <div className="bg-white rounded-2xl p-5 border border-brand-border shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-brand-border">
          <div>
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Booking ID</span>
            <div className="text-xl font-extrabold text-brand-gold-dark font-display">
              {booking.bookingId}
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-brand-gold-50 text-brand-gold-dark text-xs font-bold border border-brand-gold-200">
            Request Received
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2.5 text-slate-700">
            <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
            <span><strong>From:</strong> {booking.pickup}</span>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700">
            <Navigation className="w-4 h-4 text-brand-gold shrink-0" />
            <span><strong>To:</strong> {booking.destination}</span>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700">
            <Calendar className="w-4 h-4 text-brand-gold shrink-0" />
            <span><strong>Date:</strong> {booking.date}</span>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700">
            <Clock className="w-4 h-4 text-brand-gold shrink-0" />
            <span><strong>Time:</strong> {booking.time}</span>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700">
            <Car className="w-4 h-4 text-brand-gold shrink-0" />
            <span><strong>Trip:</strong> {booking.tripType} ({booking.vehiclePreference || 'Standard'})</span>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
            <span><strong>Passengers:</strong> {booking.passengers}</span>
          </div>
        </div>
      </div>

      {/* Human In The Loop Notice */}
      <div className="text-xs text-slate-600 bg-brand-subtle p-3.5 rounded-xl border border-brand-border leading-relaxed">
        💡 <strong>What happens next?</strong> WhiteCabz coordinates with our fleet and sends you driver details and confirmation via WhatsApp / Call.
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20BA5A] transition-colors shadow-md text-sm text-center min-h-[44px]"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp WhiteCabz</span>
        </a>

        <a
          href={getCallUrl()}
          className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-slate-800 font-semibold border border-brand-border hover:border-brand-gold/60 transition-colors text-sm text-center min-h-[44px]"
        >
          <Phone className="w-4 h-4 text-brand-gold" />
          <span>Call Coordinator ({DISPLAY_PHONE})</span>
        </a>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onClose}
          className="text-xs text-slate-500 hover:text-slate-900 underline min-h-[44px] flex items-center justify-center mx-auto"
        >
          Close & Return to Website
        </button>
      </div>
    </div>
  );
}

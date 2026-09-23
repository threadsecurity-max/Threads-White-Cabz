import React, { useState } from 'react';
import { Search, Shield, MapPin, Calendar, Clock, Car, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { getBookingStatus } from '../lib/api';
import { getWhatsAppUrl, getCallUrl, DISPLAY_PHONE } from '../lib/whatsapp';

export function BookingTrackPage({ onOpenBooking }) {
  const [bookingId, setBookingId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!bookingId.trim()) return;

    setLoading(true);
    setSearched(true);
    const result = await getBookingStatus(bookingId.trim());
    setSearchResult(result);
    setLoading(false);
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3.5">
        <Badge variant="gold">
          <Shield className="w-3.5 h-3.5" /> Booking Status
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display">
          Track Your Cab Booking
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Enter your unique WhiteCabz Booking ID (e.g., WC-2026-000123) to review your itinerary and assignment status.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="bg-white rounded-3xl p-5 sm:p-7 border border-brand-gold/30 shadow-premium space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value.toUpperCase())}
              placeholder="Enter Booking ID (e.g. WC-2026-123456)"
              required
              className="w-full pl-12 pr-4 py-3 bg-brand-subtle/70 border border-brand-border rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold uppercase font-mono tracking-wider min-h-[44px]"
            />
          </div>
          <Button type="submit" variant="gold" size="lg" disabled={loading}>
            {loading ? 'Searching...' : 'Track Status'}
          </Button>
        </div>
      </form>

      {/* Result Display */}
      {searched && (
        <div className="space-y-6">
          {searchResult ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-premium space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-border gap-3">
                <div>
                  <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Booking Reference</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-brand-gold-dark font-mono">
                    {searchResult.bookingId}
                  </h3>
                </div>
                <div className="px-3.5 py-1 rounded-full bg-brand-gold-50 text-brand-gold-dark border border-brand-gold-200 text-xs font-bold uppercase tracking-wider w-fit">
                  Status: {searchResult.status || 'Request Received'}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-slate-700">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                  <span><strong>Pickup:</strong> {searchResult.pickup}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                  <span><strong>Destination:</strong> {searchResult.destination}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-brand-gold shrink-0" />
                  <span><strong>Date:</strong> {searchResult.date}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                  <span><strong>Time:</strong> {searchResult.time}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Car className="w-4 h-4 text-brand-gold shrink-0" />
                  <span><strong>Category:</strong> {searchResult.vehiclePreference || 'Standard'} ({searchResult.tripType})</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-subtle border border-brand-border text-xs text-slate-600 leading-relaxed">
                ℹ️ <strong>Driver & Coordinator Update:</strong> Once your trip is confirmed by our dispatch team, the chauffeur's name and contact number will appear directly here.
              </div>

              <div className="pt-1 flex flex-col sm:flex-row gap-3">
                <a
                  href={getWhatsAppUrl(`Hello WhiteCabz, I am checking the status of Booking ID: ${searchResult.bookingId}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20BA5A] transition-colors text-sm flex items-center justify-center gap-2 shadow-md min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Coordinator</span>
                </a>

                <a
                  href={getCallUrl()}
                  className="py-3 px-4 rounded-xl bg-white text-slate-800 border border-brand-border hover:border-brand-gold/60 transition-colors text-sm font-semibold flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-brand-gold" />
                  <span>Call {DISPLAY_PHONE}</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white text-center border border-brand-border space-y-3.5 shadow-soft">
              <AlertCircle className="w-10 h-10 text-brand-gold mx-auto" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">Booking Not Found</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                We couldn't find a record for Booking ID <strong className="text-slate-800 font-bold">{bookingId}</strong>. Please check the spelling or contact support directly.
              </p>
              <div className="pt-2">
                <Button onClick={() => onOpenBooking()} variant="gold" size="md">
                  Create a New Booking Request
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

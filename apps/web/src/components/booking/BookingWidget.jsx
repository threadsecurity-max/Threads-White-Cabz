import React, { useState } from 'react';
import { MapPin, Navigation, Calendar, Clock, ArrowRight, MessageSquare, Car, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { getWhatsAppUrl } from '../../lib/whatsapp';

const POPULAR_CITIES = [
  'Jalandhar',
  'Amritsar Airport (ATQ)',
  'Delhi Airport (IGI T1/T2/T3)',
  'Chandigarh Airport (IXC)',
  'Adampur Airport (AIP)',
  'Dehradun Airport (DED)',
  'Jammu Airport (IXJ)',
  'Delhi NCR',
  'Chandigarh',
  'Amritsar',
  'Ludhiana',
  'Vrindavan / Mathura',
  'Haridwar / Rishikesh',
  'Manali',
  'Dharamshala',
  'Shimla',
  'Katra / Vaishno Devi',
  'Agra',
  'Jaipur',
];

const TRIP_TYPES = [
  'One Way',
  'Round Trip',
  'Airport Transfer',
  'Local',
  'Hourly Rental',
  'Wedding',
  'Corporate',
];

export function BookingWidget({ onOpenBooking, defaultValues = {} }) {
  const [pickup, setPickup] = useState(defaultValues.pickup || 'Jalandhar');
  const [destination, setDestination] = useState(defaultValues.destination || 'Delhi');
  const [tripType, setTripType] = useState(defaultValues.tripType || 'One Way');
  const [date, setDate] = useState(defaultValues.date || new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(defaultValues.time || '08:00');
  const [passengers, setPassengers] = useState(defaultValues.passengers || 2);
  const [vehiclePreference, setVehiclePreference] = useState(defaultValues.vehiclePreference || 'Sedan');

  const handleSubmit = (e) => {
    e.preventDefault();
    onOpenBooking({
      pickup,
      destination,
      tripType,
      date,
      time,
      passengers: Number(passengers),
      vehiclePreference,
    });
  };

  const handleWhatsApp = () => {
    const url = getWhatsAppUrl({
      pickup,
      destination,
      tripType,
      date,
      time,
      passengers,
      vehiclePreference,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-white rounded-3xl p-5 sm:p-7 shadow-premium border border-brand-border space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-brand-border">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Direct Booking
          </span>
          <h3 className="text-lg font-bold text-slate-900 font-display">
            Plan Your Ride
          </h3>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          24x7 Available
        </span>
      </div>

      {/* Trip Type Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {TRIP_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTripType(type)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] ${
              tripType === type
                ? 'bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-dark text-white shadow-gold-glow'
                : 'bg-brand-subtle text-slate-700 hover:text-slate-900 hover:bg-brand-border/60 border border-brand-border'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
        {/* Pickup & Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" /> Pickup From
            </label>
            <div className="relative">
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="City or Airport (e.g. Jalandhar)"
                list="hero-pickup-options"
                required
                className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all placeholder:text-slate-400 min-h-[44px]"
              />
              <datalist id="hero-pickup-options">
                {POPULAR_CITIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-brand-gold" /> Going To
            </label>
            <div className="relative">
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination (e.g. Delhi NCR)"
                list="hero-drop-options"
                required
                className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all placeholder:text-slate-400 min-h-[44px]"
              />
              <datalist id="hero-drop-options">
                {POPULAR_CITIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-gold" /> Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-2.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold transition-all min-h-[44px]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-gold" /> Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-2.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold transition-all min-h-[44px]"
            />
          </div>
        </div>

        {/* Vehicle & Passengers */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-brand-gold" /> Vehicle
            </label>
            <select
              value={vehiclePreference}
              onChange={(e) => setVehiclePreference(e.target.value)}
              className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-2.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold transition-all min-h-[44px]"
            >
              <option value="Sedan">Sedan (4 Seater)</option>
              <option value="SUV">SUV (6-7 Seater)</option>
              <option value="Premium Sedan">Premium Sedan</option>
              <option value="Luxury SUV">Luxury SUV</option>
              <option value="Wedding Cars">Wedding Car</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
              Passengers
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-2.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold transition-all min-h-[44px]"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Person' : 'Persons'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <Button
            type="submit"
            variant="gold"
            size="md"
            className="flex-1 w-full"
          >
            <span>Get Fare / Book Cab</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            onClick={handleWhatsApp}
            variant="whatsapp"
            size="md"
            className="w-full sm:w-auto px-4"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

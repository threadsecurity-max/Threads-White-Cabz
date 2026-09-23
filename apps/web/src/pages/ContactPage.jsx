import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Clock,
  Car,
  Users,
  Send,
  Navigation,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LocationAutocomplete } from '../components/booking/LocationAutocomplete';
import { createEnquiryRequest } from '../lib/api';
import { getWhatsAppUrl, getCallUrl, DISPLAY_PHONE, DISPLAY_EMAIL } from '../lib/whatsapp';

const contactEnquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  service: z.string().default('Outstation Taxi'),
  tripType: z.string().default('One Way'),
  pickup: z.string().min(2, 'Departure city or district is required'),
  destination: z.string().min(2, 'Arrival city or district is required'),
  departureDate: z.string().min(1, 'Departure date is required'),
  departureTime: z.string().min(1, 'Departure time is required'),
  returnDate: z.string().optional().or(z.literal('')),
  vehiclePreference: z.string().default('Executive Sedan (Dzire / Etios)'),
  passengers: z.string().default('1-4 Passengers'),
  message: z.string().optional().default(''),
});

const POPULAR_QUICK_ROUTES = [
  { from: 'Jalandhar, Punjab', to: 'Delhi IGI Airport (T1/T2/T3), Delhi NCR' },
  { from: 'Amritsar, Punjab', to: 'Chandigarh City, Chandigarh (UT)' },
  { from: 'Jalandhar, Punjab', to: 'Shimla, Himachal Pradesh' },
  { from: 'Ludhiana, Punjab', to: 'Delhi (All Zones), Delhi NCR' },
  { from: 'Jalandhar, Punjab', to: 'Haridwar, Uttarakhand' },
  { from: 'Chandigarh City, Chandigarh (UT)', to: 'Manali, Himachal Pradesh' },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submittedId, setSubmittedId] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactEnquirySchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: 'Outstation Taxi',
      tripType: 'One Way',
      pickup: 'Jalandhar, Punjab',
      destination: '',
      departureDate: today,
      departureTime: '08:00',
      returnDate: '',
      vehiclePreference: 'Executive Sedan (Dzire / Etios)',
      passengers: '1-4 Passengers',
      message: '',
    },
  });

  const tripType = watch('tripType');
  const pickup = watch('pickup');
  const destination = watch('destination');
  const departureDate = watch('departureDate');
  const departureTime = watch('departureTime');
  const vehiclePreference = watch('vehiclePreference');
  const passengers = watch('passengers');
  const name = watch('name');
  const phone = watch('phone');
  const message = watch('message');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await createEnquiryRequest(data);
      if (res.success) {
        setSubmitted(true);
        setSubmittedId(res.data?.enquiryId || 'CONFIRMED');
        reset();
      }
    } catch (err) {
      setError(
        'Submission failed. Please connect with our coordinator directly on WhatsApp for instant confirmation.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppDirectLink = () => {
    const text = `Hello WhiteCabz, I would like to book a cab with your service.

*Name:* ${name || '[Your Name]'}
*Phone:* ${phone || '[Your Phone]'}
*Pickup Location:* ${pickup || '[Departure City]'}
*Drop Location:* ${destination || '[Arrival City]'}
*Trip Type:* ${tripType}
*Preferred Vehicle:* ${vehiclePreference}
*Date:* ${departureDate || today}
*Time:* ${departureTime || '08:00'}
*Passengers:* ${passengers}
${message ? `*Notes:* ${message}` : ''}

Please confirm vehicle availability and the best fare quote. Thank you!`;

    return getWhatsAppUrl(text);
  };

  return (
    <div className="relative pt-28 sm:pt-32 pb-24 fluid-container space-y-12 sm:space-y-16">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.035] bg-[radial-gradient(#B89344_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Header with Sleek Minimal Typography Watermark */}
      <div className="text-center max-w-4xl mx-auto space-y-4 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold-50 border border-brand-gold-200 text-brand-gold-dark text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>Pan-India Mobility Desk & 24×7 Dispatch</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 font-display tracking-tight">
          Precision Travel Booking & Inquiries
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
          Select any departure and arrival city across India. Our coordinator will provide instant confirmation, transparent per-km billing, and luxury chauffeur dispatch.
        </p>

        {/* Minimal Typographic Sleek Ticker */}
        <div className="pt-2 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
          <span>• Jalandhar HQ</span>
          <span>• Amritsar Hub</span>
          <span>• Delhi IGI Airport</span>
          <span>• Chandigarh UT</span>
          <span>• All States & Districts</span>
        </div>
      </div>

      {/* Main Grid: Form + Contact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Side: Contact Channels & Trust Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-border shadow-soft space-y-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                Direct Dispatch Channels
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Get an instant quote or speak directly with our tour coordinators.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={getCallUrl()}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-brand-subtle border border-brand-border hover:border-brand-gold/60 transition-all shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold-50 text-brand-gold-dark flex items-center justify-center shrink-0 border border-brand-gold-200 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">24×7 Helpline Phone</span>
                  <span className="text-base font-bold text-slate-900">{DISPLAY_PHONE}</span>
                </div>
              </a>

              <a
                href={getWhatsAppUrl('Hello WhiteCabz Support, I would like to book a cab.')}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366]/60 transition-all shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">WhatsApp Fast Response</span>
                  <span className="text-sm sm:text-base font-bold text-emerald-700">Chat with Coordinator</span>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-brand-subtle border border-brand-border">
                <div className="w-10 h-10 rounded-xl bg-brand-gold-50 text-brand-gold-dark flex items-center justify-center shrink-0 border border-brand-gold-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">Official Inquiries & Billing</span>
                  <span className="text-sm font-bold text-slate-900">{DISPLAY_EMAIL}</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-brand-subtle border border-brand-border">
                <div className="w-10 h-10 rounded-xl bg-brand-gold-50 text-brand-gold-dark flex items-center justify-center shrink-0 border border-brand-gold-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">Operations Base</span>
                  <span className="text-sm font-bold text-slate-900">Jalandhar, Punjab, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Route Shortcuts */}
          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-soft space-y-3.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-brand-gold" />
              <span>Popular Fast Routes</span>
            </h4>
            <div className="space-y-2">
              {POPULAR_QUICK_ROUTES.map((r, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setValue('pickup', r.from);
                    setValue('destination', r.to);
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-brand-subtle/70 hover:bg-brand-gold-50 border border-brand-border hover:border-brand-gold/40 text-xs text-slate-700 flex items-center justify-between transition-colors group"
                >
                  <div className="truncate">
                    <span className="font-semibold text-slate-900 block truncate">
                      {r.from.split(',')[0]} &rarr; {r.to.split(',')[0]}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      {r.to}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-gold shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Assurance Pillar */}
          <div className="bg-gradient-to-br from-brand-gold-50/70 to-brand-subtle p-5 rounded-3xl border border-brand-gold/30 text-xs space-y-2 text-slate-700">
            <div className="flex items-center gap-2 font-bold text-brand-gold-dark text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Accurate & Transparent Policy</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Every inquiry is logged with guaranteed vehicle model lock, verified commercial chauffeur credentials, and zero hidden surcharge.
            </p>
          </div>
        </div>

        {/* Right Side: Precision Itinerary & Travel Booking Form */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-gold/35 shadow-premium space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  Travel Booking & Route Plan
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Select your cities and travel dates for exact fare quotation.
                </p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-brand-subtle rounded-xl border border-brand-border">
                {['One Way', 'Round Trip', 'Airport'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setValue('tripType', type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      tripType === type
                        ? 'bg-brand-gold text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {submitted ? (
              <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-4 text-center animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-emerald-950">
                  Thank You! Your Travel Booking Has Been Received
                </h3>
                <p className="text-sm text-emerald-800 max-w-md mx-auto">
                  Enquiry ID: <strong className="font-mono bg-emerald-100 px-2 py-0.5 rounded">{submittedId}</strong>. A WhiteCabz coordinator is reviewing your route and will dispatch vehicle options shortly.
                </p>
                <div className="pt-3 flex flex-wrap justify-center gap-3">
                  <a
                    href={generateWhatsAppDirectLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#20ba5a] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp for Quick Confirmation</span>
                  </a>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    size="sm"
                  >
                    Book Another Route
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Section: Route Origin & Destination */}
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark block">
                    1. Route & Travel Cities (Pan-India Coverage)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                      name="pickup"
                      control={control}
                      render={({ field }) => (
                        <LocationAutocomplete
                          label="Departure City / District (From)"
                          placeholder="Search state, district, or airport..."
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.pickup?.message}
                          required
                        />
                      )}
                    />

                    <Controller
                      name="destination"
                      control={control}
                      render={({ field }) => (
                        <LocationAutocomplete
                          label="Arrival City / District (To)"
                          placeholder="Search destination city or district..."
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.destination?.message}
                          required
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Section: Schedule & Vehicle */}
                <div className="space-y-4 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark block">
                    2. Date, Timing & Vehicle Preference
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-gold-dark" />
                        <span>Departure Date *</span>
                      </label>
                      <input
                        type="date"
                        min={today}
                        {...register('departureDate')}
                        className="w-full bg-brand-subtle/80 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
                      />
                      {errors.departureDate && (
                        <p className="text-[11px] text-rose-600">{errors.departureDate.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-gold-dark" />
                        <span>Departure Time *</span>
                      </label>
                      <input
                        type="time"
                        {...register('departureTime')}
                        className="w-full bg-brand-subtle/80 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
                      />
                      {errors.departureTime && (
                        <p className="text-[11px] text-rose-600">{errors.departureTime.message}</p>
                      )}
                    </div>

                    {tripType === 'Round Trip' ? (
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-brand-gold-dark" />
                          <span>Return Date</span>
                        </label>
                        <input
                          type="date"
                          min={departureDate || today}
                          {...register('returnDate')}
                          className="w-full bg-brand-subtle/80 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
                        />
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-brand-gold-dark" />
                          <span>Passengers</span>
                        </label>
                        <select
                          {...register('passengers')}
                          className="w-full bg-brand-subtle/80 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
                        >
                          <option value="1-4 Passengers">1 - 4 Passengers (Sedan / Hatch)</option>
                          <option value="5-7 Passengers">5 - 7 Passengers (SUV / Innova)</option>
                          <option value="8-12 Passengers">8 - 12 Passengers (Executive Traveller)</option>
                          <option value="13-17 Passengers">13 - 17 Passengers (Luxury Mini Bus)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-brand-gold-dark" />
                        <span>Vehicle Model Preference</span>
                      </label>
                      <select
                        {...register('vehiclePreference')}
                        className="w-full bg-brand-subtle/80 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
                      >
                        <option value="Executive Sedan (Dzire / Etios)">Executive Sedan (Dzire / Etios) - Best for 1-4 Pax</option>
                        <option value="Innova Crysta / Hycross">Toyota Innova Crysta / Hycross - Premium Comfort</option>
                        <option value="Executive Ertiga / XL6">Maruti Ertiga / XL6 - Economical 6-Seater</option>
                        <option value="Toyota Fortuner">Toyota Fortuner (VIP / Wedding Chauffeur)</option>
                        <option value="Luxury Urbania / Tempo Traveller">Force Urbania / 12-17s Tempo Traveller</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Trip Category / Service</label>
                      <select
                        {...register('service')}
                        className="w-full bg-brand-subtle/80 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
                      >
                        <option value="Outstation Taxi">Outstation One-Way / Round Trip</option>
                        <option value="Airport Pickup / Drop">Airport Transfer (IGI / ATQ / IXC)</option>
                        <option value="Wedding Transportation">Wedding & Event Transportation</option>
                        <option value="Corporate Mobility">Corporate / VIP Chauffeur</option>
                        <option value="Tour / Pilgrimage Package">Pilgrimage & Hill Station Package</option>
                        <option value="Local Hourly Cab">Local City Hourly Package (8hr / 80km)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section: Contact & Personal Details */}
                <div className="space-y-4 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark block">
                    3. Contact Details (For Driver Details & Itinerary Dispatch)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Full Name *</label>
                      <input
                        {...register('name')}
                        placeholder="e.g. Kunal Sharma"
                        className="w-full bg-brand-subtle/80 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
                      />
                      {errors.name && (
                        <p className="text-[11px] text-rose-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                      <input
                        type="tel"
                        {...register('phone')}
                        placeholder="e.g. 9478613001"
                        className="w-full bg-brand-subtle/80 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-600">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Email (For Confirmation Receipt)</label>
                      <input
                        type="email"
                        {...register('email')}
                        placeholder="you@example.com"
                        className="w-full bg-brand-subtle/80 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      Special Requirements / Luggage Notes / Flight Details
                    </label>
                    <textarea
                      {...register('message')}
                      rows={3}
                      placeholder="e.g. Need child seat, extra boot space for 3 large suitcases, flight arriving at Delhi T3..."
                      className="w-full bg-brand-subtle/80 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold resize-none"
                    />
                  </div>
                </div>

                {/* Dual Action Buttons */}
                <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Booking Details...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Booking Request</span>
                      </>
                    )}
                  </Button>

                  <a
                    href={generateWhatsAppDirectLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md text-center"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant WhatsApp Dispatch</span>
                  </a>
                </div>

                <p className="text-[11px] text-center text-slate-500 pt-1">
                  * Instant acknowledgment with driver details and best fare guarantee sent to both your email and WhatsApp.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

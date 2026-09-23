import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { LocationAutocomplete } from './LocationAutocomplete';
import { BookingConfirmation } from './BookingConfirmation';
import { createBookingRequest } from '../../lib/api';
import { DISPLAY_PHONE } from '../../lib/whatsapp';
import { MapPin, Navigation, Calendar, Clock, Phone, User, Mail, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required (min 2 characters)'),
  phone: z.string().min(10, 'Valid 10-digit mobile number is required'),
  whatsapp: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  pickup: z.string().min(2, 'Pickup location is required'),
  destination: z.string().min(2, 'Destination is required'),
  tripType: z.string().min(1, 'Trip type is required'),
  date: z.string().min(1, 'Travel date is required'),
  time: z.string().min(1, 'Pickup time is required'),
  passengers: z.coerce.number().min(1).max(20),
  vehiclePreference: z.string().optional(),
  specialRequirements: z.string().optional(),
});

export function BookingModal({ isOpen, onClose, initialData = {} }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      whatsapp: '',
      email: '',
      pickup: initialData.pickup || 'Jalandhar',
      destination: initialData.destination || 'Delhi',
      tripType: initialData.tripType || 'One Way',
      date: initialData.date || new Date().toISOString().split('T')[0],
      time: initialData.time || '08:00',
      passengers: initialData.passengers || 2,
      vehiclePreference: initialData.vehiclePreference || 'Sedan',
      specialRequirements: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      setConfirmedBooking(null);
      setServerError(null);
      if (initialData.pickup) setValue('pickup', initialData.pickup);
      if (initialData.destination) setValue('destination', initialData.destination);
      if (initialData.tripType) setValue('tripType', initialData.tripType);
      if (initialData.date) setValue('date', initialData.date);
      if (initialData.time) setValue('time', initialData.time);
      if (initialData.passengers) setValue('passengers', initialData.passengers);
      if (initialData.vehiclePreference) setValue('vehiclePreference', initialData.vehiclePreference);
    }
  }, [isOpen, initialData, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await createBookingRequest(data);
      if (response.success && response.data) {
        setConfirmedBooking({
          ...data,
          bookingId: response.data.bookingId,
          whatsappLink: response.data.whatsappLink,
        });
      } else {
        throw new Error(response.message || 'Failed to submit booking');
      }
    } catch (err) {
      setServerError(
        `We're having trouble processing your request right now. Please call or WhatsApp WhiteCabz directly at ${DISPLAY_PHONE}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={confirmedBooking ? 'Booking Status' : 'Request a Cab Booking'}
      maxWidth="max-w-2xl"
    >
      {confirmedBooking ? (
        <BookingConfirmation booking={confirmedBooking} onClose={handleClose} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {serverError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brand-gold" /> Your Full Name *
              </label>
              <input
                {...register('name')}
                placeholder="e.g. Kunal Sharma"
                className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
              />
              {errors.name && <p className="text-[11px] text-rose-600">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-gold" /> Mobile Phone Number *
              </label>
              <input
                type="tel"
                {...register('phone')}
                placeholder="e.g. 9876543210"
                className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
              />
              {errors.phone && <p className="text-[11px] text-rose-600">{errors.phone.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#20BA5A]" /> WhatsApp (Optional)
              </label>
              <input
                type="tel"
                {...register('whatsapp')}
                placeholder="Same as phone or alternate"
                className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-gold" /> Email Address (Optional)
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="For booking receipt"
                className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
              />
            </div>
          </div>

          {/* Journey Details */}
          <div className="pt-2 border-t border-brand-border/80 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Controller
              name="pickup"
              control={control}
              render={({ field }) => (
                <LocationAutocomplete
                  label="Pickup Location"
                  placeholder="Departure city, district, or airport..."
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
                  label="Drop Destination"
                  placeholder="Arrival city, district, or airport..."
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.destination?.message}
                  required
                />
              )}
            />

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" /> Travel Date *
              </label>
              <input
                type="date"
                {...register('date')}
                className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-gold" /> Pickup Time *
              </label>
              <input
                type="time"
                {...register('time')}
                className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="pt-2 border-t border-brand-border/80 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Trip Type</label>
              <select
                {...register('tripType')}
                className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
              >
                <option value="One Way">One Way</option>
                <option value="Round Trip">Round Trip</option>
                <option value="Local">Local Jalandhar</option>
                <option value="Airport Transfer">Airport Transfer</option>
                <option value="Hourly Rental">Hourly Rental</option>
                <option value="Wedding">Wedding Transportation</option>
                <option value="Corporate">Corporate Travel</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Vehicle Category</label>
              <select
                {...register('vehiclePreference')}
                className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
              >
                <option value="Sedan">Sedan (4 Seater)</option>
                <option value="SUV">SUV (6-7 Seater)</option>
                <option value="Premium Sedan">Premium Sedan</option>
                <option value="Luxury SUV">Luxury SUV</option>
                <option value="Wedding Cars">Wedding Luxury Car</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Passengers</label>
              <select
                {...register('passengers')}
                className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold min-h-[44px]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Person' : 'Persons'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Special Requirements / Notes (Optional)</label>
            <textarea
              {...register('specialRequirements')}
              rows={2}
              placeholder="Flight number, extra luggage, child seat, or specific stops"
              className="w-full bg-brand-subtle/70 border border-brand-border rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-brand-gold resize-none"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-brand-border/80">
            <Button type="button" variant="outline" size="md" onClick={handleClose}>
              Cancel
            </Button>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              disabled={isSubmitting}
              className="min-w-[180px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Request Booking</span>
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

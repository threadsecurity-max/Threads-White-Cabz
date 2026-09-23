import { z } from 'zod';
import { TRIP_TYPES } from '../config/constants.js';
import { isValidPhone } from '../middleware/validate.middleware.js';

export const createBookingSchema = z.object({
  name: z
    .string({ required_error: 'Customer name is required' })
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Name should only contain letters and basic punctuation'),
  phone: z
    .string({ required_error: 'Valid contact number is required' })
    .refine((val) => isValidPhone(val), {
      message: 'Please enter a valid 10-digit phone number without repetitive digits',
    }),
  whatsapp: z.string().optional(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  pickup: z
    .string({ required_error: 'Pickup location is required' })
    .min(2, 'Pickup location must be at least 2 characters')
    .max(150),
  destination: z
    .string({ required_error: 'Drop destination is required' })
    .min(2, 'Destination must be at least 2 characters')
    .max(150),
  tripType: z.enum(TRIP_TYPES, {
    errorMap: () => ({ message: 'Please select a valid trip type' }),
  }),
  date: z
    .string({ required_error: 'Travel date is required' })
    .min(1, 'Travel date is required')
    .refine((val) => {
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, {
      message: 'Travel date cannot be in the past',
    }),
  time: z
    .string({ required_error: 'Pickup time is required' })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:MM)'),
  passengers: z
    .coerce
    .number()
    .int('Passenger count must be an integer')
    .min(1, 'At least 1 passenger is required')
    .max(30, 'Passenger count exceeds maximum vehicle capacity')
    .default(1),
  vehiclePreference: z.string().max(100).optional().default('Any'),
  specialRequirements: z.string().max(1000, 'Special notes cannot exceed 1000 characters').optional(),
  source: z.string().max(50).optional().default('Website'),
}).refine((data) => data.pickup.toLowerCase() !== data.destination.toLowerCase(), {
  message: 'Pickup location and destination cannot be identical',
  path: ['destination'],
});

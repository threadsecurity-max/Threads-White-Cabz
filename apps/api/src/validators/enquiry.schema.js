import { z } from 'zod';
import { isValidPhone } from '../middleware/validate.middleware.js';

export const createEnquirySchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Name should only contain letters and basic punctuation'),
  phone: z
    .string({ required_error: 'Valid contact number is required' })
    .refine((val) => isValidPhone(val), {
      message: 'Please enter a valid 10-digit phone number',
    }),
  whatsapp: z.string().optional(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  service: z.string().max(100).optional().default('Outstation Taxi'),
  pickup: z.string().max(150).optional(),
  destination: z.string().max(150).optional(),
  tripType: z.string().max(50).optional(),
  departureDate: z.string().optional(),
  departureTime: z.string().optional(),
  returnDate: z.string().optional(),
  vehiclePreference: z.string().max(100).optional(),
  passengers: z.union([z.number(), z.string()]).optional(),
  message: z.string().max(1500, 'Message cannot exceed 1500 characters').optional().default(''),
  source: z.string().max(50).optional().default('Website Contact Form'),
});

import { Router } from 'express';
import { createBooking, getBookingById } from '../controllers/booking.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { createBookingSchema } from '../validators/booking.schema.js';
import { bookingLimiter } from '../middleware/rateLimit.middleware.js';

const router = Router();

router.post('/', bookingLimiter, validate(createBookingSchema), createBooking);
router.get('/:id', getBookingById);

export default router;

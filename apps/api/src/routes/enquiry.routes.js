import { Router } from 'express';
import { createEnquiry } from '../controllers/enquiry.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { createEnquirySchema } from '../validators/enquiry.schema.js';
import { bookingLimiter } from '../middleware/rateLimit.middleware.js';

const router = Router();

router.post('/', bookingLimiter, validate(createEnquirySchema), createEnquiry);

export default router;
